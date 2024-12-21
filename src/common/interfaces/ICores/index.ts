export interface ISuccessResponse {
    message?: string
    status?: number
    reasonStatusCode?: string
    metadata?: object
}

export interface IOK {
    message?: string
    status?: number
    reasonStatusCode?: string
    metadata?: object
}

export interface ICreated {
    message?: string
    status?: number
    reasonStatusCode?: string
    metadata?: object
    option: object;
}

export interface IErrorResponse {
    message?: string
    status?: number
}