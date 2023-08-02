import {makeAutoObservable} from "mobx";
import {IDate} from "../algorithms/calendar";

export interface ITime extends IDate {
    hourTo: number
}

class Calendar {

    private _tasks: ITime[]
    private _activeCell: ITime | null

    constructor() {
        makeAutoObservable(this)
        this._tasks = []
        this._activeCell = null
    }

    get tasks() {
        return this._tasks
    }

    get activeCell() {
        return this._activeCell
    }

    set activeCell(cell: ITime | null) {
        if (!cell) {
            this._activeCell = null
        } else {
            this._activeCell = {...cell}
        }
    }

    equal(task1: ITime | null, task2: ITime | null) {
        if (!task1 || !task2) {
            return false
        }
        return task1.year === task2.year && task1.month === task2.month
        && task1.day === task2.day && task1.hourTo === task2.hourTo
    }

    addTask(task: ITime) {
        if (this._tasks.find(t => this.equal(t, task)))
        {
            return false
        }
        this._tasks = [...this._tasks, task]
        return true
    }

    removeTask(task: ITime | null) {
        if (!task) {
            return
        }
        this._tasks = this._tasks.filter(t =>
            !(t.year === task.year && t.month === task.month && t.day === task.day
                && t.hourTo === task.hourTo
            ))
    }

    getTasksByDate(date: IDate | null) {
        if (!date) return []
        return this._tasks.filter(task => task.year === date.year &&
            task.month === date.month && task.day === date.day
        )
    }


}

export default new Calendar()