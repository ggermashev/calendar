import React, {FC, useEffect} from 'react';
import {Wrap, Number, WeekDay} from './styles/styles'
import {IDate} from "../../../algorithms/calendar";

interface IDay {
    i: number,
    day: number,
    month: number,
    year: number,
    date: IDate | null,
}

const Day: FC<IDay> = ({i,day, month, year, date}) => {

    const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

    return (
        <Wrap>
            <WeekDay>{weekDays[i]}</WeekDay>
            <Number $current={date?.day === day && date?.month === month && date?.year === year}>
                <p>{day}</p>
            </Number>
        </Wrap>
    );
};

export default Day;