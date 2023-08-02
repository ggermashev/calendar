import React, {FC, useState} from 'react';
import {ModalWindow} from "../../ui";
import {Buttons, Button, Header, Input} from './styles/styles'
import Calendar from "../../store/Calendar";
import {getDaysCount, months} from "../../algorithms/calendar";

interface IAddEvent {
    show: boolean,
    setShow: (show: boolean) => void,
    onSubmit?: () => void,
    onCancel?: () => void,
}

function validate(value: string) {
    if (!/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/.test(value)) {
        return false
    }
    const [date, time] = value.split(' ')
    const [year, month, day] = date.split('-').map(item => +item)
    const [hour, minute, second] = time.split(':').map(item => +item)

    if (month < 1 || month > 12) {
        return false
    }
    if (day < 1 || day > getDaysCount(months[month - 1], year)) {
        return false
    }
    if (hour < 8 || hour > 20) {
        return false
    }
    if (hour === 8 && minute === 0 && second === 0) {
        return false
    }
    if (minute < 0 || minute >= 60) {
        return false
    }
    if (second < 0 || second >= 60) {
        return false
    }

    return Calendar.addTask({
        year, month, day, hourTo: minute > 0 || second > 0 ? hour + 1 : hour})

}

const AddEvent: FC<IAddEvent> = ({
                                     show,
                                     setShow,
                                     onCancel,
                                     onSubmit
                                 }) => {

    const [time, setTime] = useState('')

    return (
        <ModalWindow hidden={!show}>
            <Header>
                <h4>https://calendar.com</h4>
                <p>Enter event time:</p>
                <p>YYYY-MM-DD HH:mm:ss</p>
            </Header>
            <Input value={time} onChange={e => setTime(e.target.value)}/>
            <Buttons>
                <Button
                    $left={true}
                    onClick={() => {
                        setShow(false)
                        onCancel?.()
                    }}
                >
                    <p>Cancel</p>
                </Button>
                <Button
                    $right={true}
                    onClick={() => {
                        setShow(false)
                        if (!validate(time)) {
                            alert('Ошибка ввода')
                        }
                        onSubmit?.()
                    }}
                >
                    <p>OK</p>
                </Button>
            </Buttons>
        </ModalWindow>
    )
}

export default AddEvent;