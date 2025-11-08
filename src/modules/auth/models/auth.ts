export type User = {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
}

export type LoginArgs = {
    username: string
    password: string
}

export type LoginResponse = User & {
    accessToken: string,
    refreshToken: string
}