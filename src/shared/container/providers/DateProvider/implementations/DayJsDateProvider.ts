import dayjs from "dayjs"
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

import { IDateProvider } from "../IDateProvider";

class DayJsDateProvider implements IDateProvider {
    compareInHours(start_date: Date, end_date: Date): number {

        const startDateUTC = this.convertToUTC(start_date)

        const endDateUTC = this.convertToUTC(end_date)


        return dayjs(endDateUTC).diff(startDateUTC, "hours")
    }

    convertToUTC(date: Date): string {
        return dayjs(date)
            .utc().
            local().
            format()
    }

    dateNow(): Date {
        return dayjs().toDate()
    }

    compareInDays(start_date: Date, end_date: Date): number {

        const startDateUTC = this.convertToUTC(start_date)

        const endDateUTC = this.convertToUTC(end_date)


        return dayjs(endDateUTC).diff(startDateUTC, "days")
    }

    addDays(days: number): Date {
        return dayjs().add(days, 'days').toDate()
    }

    addHours(hours: number): Date {
        return dayjs().add(hours, 'hour').toDate()
    }
}

export { DayJsDateProvider }