export const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December']

export interface IDate {
    year: number,
    month: number,
    day: number
}

function isLeap(year: number) {
    if (year % 4 === 0) {
        if (year % 100 !== 0) {
            return true
        } else {
            if (year % 400 === 0) {
                return true
            } else {
                return false
            }
        }
    } else {
        return false
    }
}

function isFuture(_year: number, _month: number, _day: number,
                  year: number, month: number, day: number) {
    if (year > _year) {
        return true
    } else if (year < _year) {
        return false
    }

    if (month > _month) {
        return true
    } else if (month < _month) {
        return false
    }

    if (day > _day) {
        return true
    } else if (day < _day) {
        return false
    }

    return false
}

function getDateThrough(year: number, month: number, day: number, delta: number) {
    if (delta > 0) {
        if (day + delta > getDaysCount(months[month - 1], year)) {
            day = delta - getDaysCount(months[month - 1], year) + day
            month++
        } else {
            day += delta
        }
        if (month === 13) {
            year++
            month = 1
        }
    } else {
        if (day + delta < 1) {
            month--
            if (month < 1) {
                month = 12
                year--
            }
            day = getDaysCount(months[month - 1], year) + (day + delta)
        } else {
            day += delta
        }
    }
    return {year, month, day}
}

function getDaysCount(month: string, year: number) {
    if (['January', 'March', 'May',
        'July', 'August', 'October', 'December'].includes(month)) {
        return 31
    } else if (month === 'February') {
        if (isLeap(year)) {
            return 29
        } else {
            return 28
        }
    } else {
        return 30
    }
}

function checkDayIsValid(year: number, month: number, day: number) {
    return day > 0 && day <= getDaysCount(months[month - 1], year)
}

function getMonday(year: number, month: number, day: number): IDate {
    //monday
    const _day = 31
    const _month = 7
    const _year = 2023
    const date = {year, month, day}
    let distance = 0
    if (isFuture(_year, _month, _day, year, month, day)) {
        while (isFuture(_year, _month, _day, year, month, day)) {
            day--
            if (day === 0) {
                month--
                if (month === 0) {
                    year--
                    month = 12
                }
                day = getDaysCount(months[month-1], year)
            }
            distance++
        }
    } else {
        while (isFuture(year, month, day, _year, _month, _day)) {
            day++
            if (day === getDaysCount(months[month-1], year)) {
                day = 1
                month++
                if (month === 13) {
                    month = 1
                    year++
                }
            }
            distance++
        }
    }
    const delta = distance % 7
    return getDateThrough(date.year, date.month, date.day, -delta)
}

export {
    checkDayIsValid,
    getDaysCount,
    getMonday,
    isFuture,
    getDateThrough,
    isLeap,
}