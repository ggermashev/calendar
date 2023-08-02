import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {Button} from "../../ui";
import {
    Wrap,
    Header,
    Cells,
    Nav,
    Times,
    Content,
    Days,
    Footer,
    Menu,
} from './styles/styles'
import Day from "./Day/Day";
import Cell from './Cell/Cell'
import AddEvent from "../AddEvent/AddEvent";
import {getDateThrough, getDaysCount, getMonday, IDate, months} from "../../algorithms/calendar";
import CalendarModel, {ITime} from "../../store/Calendar";
import {observer} from "mobx-react-lite";

const Calendar = observer( () => {

    const [deleteIsHidden, setDeleteIsHidden] = useState(false)

    const [monday, setMonday] = useState<IDate>()
    const [days, setDays] = useState<IDate[] | null>(null)
    const [currentMonth, setCurrentMonth] = useState(0)
    const [currentYear, setCurrentYear] = useState(0)

    const times = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
        '16:00', '17:00', '18:00', '19:00', '20:00', '21:00']

    const [showModal, setShowModal] = useState(false)

    const [date, setDate] = useState<IDate | null>(null)
    const [refresh, setRefresh] = useState(true)

    const [hasTask, setHasTask] = useState<boolean[][]>()

    const setNextWeek = useCallback((_monday: IDate) => {
        let _month = _monday.month
        setCurrentMonth(_month)
        let _year = _monday.year
        setCurrentYear(_year)
        setMonday(_monday)
        const _days = []
        let _day = _monday.day
        while (_days.length < 7) {
            _days.push({day: _day, month: _month, year: _year})
            _day++
            if (_day > getDaysCount(months[_monday.month - 1], _monday.year)) {
                _day = 1
                if (_monday.month < 12) {
                    setCurrentMonth(_monday.month + 1)
                    _month++
                } else {
                    setCurrentMonth(1)
                    _month = 1
                    setCurrentYear(_monday.year + 1)
                    _year++
                }
            }
        }
        setDays([..._days])
    }, [])

    useEffect(() => {
        const today = new Date()
        const [month, day, year] = today.toLocaleDateString().split('/').map(data => +data)
        setDate({year, month, day})
        const date = {year, month, day}
        setCurrentMonth(month)
        setCurrentYear(year)

        CalendarModel.importTasks()

        const _monday = getMonday(date.year, date.month, date.day)
        setNextWeek(_monday)
    }, [refresh])

    const swap = useCallback((direction: 'left' | 'right') => {
        if (monday) {
            let _monday;
            if (direction === 'right') {
                _monday = getDateThrough(monday.year, monday.month, monday.day, 7)
            } else {
                _monday = getDateThrough(monday.year, monday.month, monday.day, -7)
            }
            setNextWeek(_monday)
        }
    }, [monday])

    const tasks: ITime[] = useMemo(() => {
        const res = []
        if (days) {
            for (let day of days) {
                res.push(...CalendarModel.getTasksByDate(day))
            }
        }
        return res
    }, [monday, CalendarModel.tasks])

    useEffect(() => {
        if (days) {
            let _hasTask = new Array(13)
            for (let i = 0; i < 13; i++) {
                _hasTask[i] = new Array(7).fill(false)
            }
            console.log(tasks)
            tasks.forEach(task => {
                _hasTask[task.hourTo - 9][days?.findIndex(day => day.day === task.day)] = true
            })
            setHasTask(_hasTask)

            CalendarModel.exportTasks()
        }

    }, [tasks])

    return (
        <Wrap>
            <Header>
                <h3>Interview Calendar</h3>
                <AddIcon
                    className={'addIcon'}
                    onClick={() => {
                        setShowModal(true)
                    }}
                />
            </Header>
            <Menu>
                <Days>
                    {days?.map((day, i) =>
                        <Day
                            key={i}
                            i={i}
                            day={day.day}
                            month={day.month}
                            year={day.year}
                            date={date}
                        />)}
                </Days>
                <Nav>
                    <KeyboardArrowLeftIcon
                        className={'arrow'}
                        style={{marginLeft: 'calc(100% / 14 - .5em)'}}
                        onClick={() => {
                            swap('left')
                        }}
                    />
                    <p>{months[currentMonth - 1]} {currentYear}</p>
                    <KeyboardArrowRightIcon
                        className={'arrow'}
                        style={{marginRight: 'calc(100% / 14 - .5em)'}}
                        onClick={() => {
                            swap('right')
                        }}
                    />
                </Nav>
            </Menu>
            <Content>
                <Times>
                    {times.slice(0, -1).map(time => <p>{time}</p>)}
                </Times>
                <Cells>
                    {times.map((time, i) => {
                        return days?.map((day, j) =>
                            <Cell
                                hasTask={!!hasTask && hasTask[i][j]}
                                key={`${i}${j}`}
                                i={i}
                                j={j}
                                time={{...day, hourTo: +time.slice(0,2)} as ITime}
                            />)
                    })}
                </Cells>
            </Content>
            <Footer>
                <Button
                    $clear={true}
                    onClick={() => {
                        setRefresh(!refresh)
                    }}
                >
                    Today
                </Button>
                <Button
                    $clear={true}
                    $hidden={!CalendarModel.activeCell}
                    onClick={() => {
                        CalendarModel.removeTask(CalendarModel.activeCell)
                        CalendarModel.activeCell = null
                    }}
                >
                    Delete
                </Button>
            </Footer>
            <AddEvent show={showModal} setShow={setShowModal}/>
        </Wrap>
    );
});

export default Calendar;