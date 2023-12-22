import { MonthsEnum } from "./enums/monthsEnum.model"
import { StatusEnum } from "./enums/statusEnum.model"

export interface SearchContext {
    page?: number
    size?: number
    studentNumber?: number
    referenceMonth?: MonthsEnum
    studentStatus?: StatusEnum
}