export enum ErrorStatusCode {
    UnknownError = 10000,
    Failure = 10002,
    ValidationError = 10003
}

export enum SuccessStatusCode {
    Success = 20000
}

export function getDescription(status: SuccessStatusCode | ErrorStatusCode): string {
    return status in SuccessStatusCode ? SuccessStatusCodeDescription[status] : ErrorStatusCodeDescription[status];
}

const ErrorStatusCodeDescription: { [key: number]: string } = {
    10000: "Unknown error, please try again.",
    10002: "Failed to execute operation.",
    10003: "Invalid payload format"
}

const SuccessStatusCodeDescription: { [key: number]: string } = {
    20000: "Operation executed successfully."
}
