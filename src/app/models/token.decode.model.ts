export interface TokenDecode {
        iss: string,
        sub: string,
        role: string,
        exp: number
        userinfo: {
                userId: string,
                role: string,
                fullName: string,
                firstLogin: boolean
        }
}