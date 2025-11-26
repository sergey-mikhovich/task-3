export type LocalUser = {
    username: string
    email: string
    password: string
}

export type LocalUsers = Record<string, LocalUser>