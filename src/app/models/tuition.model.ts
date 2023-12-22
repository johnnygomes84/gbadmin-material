import { MonthsEnum } from "./enums/monthsEnum.model"

export interface Tuition {
    id?: string
    studentNumber: number
    amount: number
    referenceMonth: MonthsEnum
}