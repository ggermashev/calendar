import React, {FC, useEffect} from 'react';
import {Wrap} from './styles/styles'
import {observer} from "mobx-react-lite";
import Calendar, {ITime} from "../../../store/Calendar";

interface ICell {
    i: number,
    j: number,
    hasTask: boolean,
    time: ITime
}

const Cell: FC<ICell> = observer(({
                                      i,
                                      j,
                                      hasTask,
                                      time
                                  }) => {


    return (
        <Wrap
            $top={i === 0}
            $bottom={i === 12}
            $left={j === 0}
            $right={j === 6}
            $hasTask={hasTask}
            $isActive={Calendar.equal(Calendar.activeCell, time)}
            onClick={() => {
                if (hasTask) {
                    if (Calendar.equal(Calendar.activeCell, time)) {
                        Calendar.activeCell = null
                    } else {
                        Calendar.activeCell = time
                    }
                }
            }}
        />
    );
});

export default Cell;