export interface DashBoardDto {
    dashStudent: {
        studentTotal: number,
        studentActive: number,
        studentInactive: number,
        studentCanceled: number,
        studentMini: number,
        studentPc1: number,
        studentPc2: number,
        studentJuniors: number,
        studentGB1: number,
        studentGB2: number
    },
    dashTuition: {
        tuitionPaid: number,
        tuitionOpen: number,
        tuitionOpenLonger: number
    }
}