import { NextFunction, Request, Response } from "express";
import util from 'util';
export enum LoggerColor {
    Reset = "\x1b[0m",
    Bright = "\x1b[1m",
    Dim = "\x1b[2m",
    Underscore = "\x1b[4m",
    Blink = "\x1b[5m",
    Reverse = "\x1b[7m",
    Hidden = "\x1b[8m",

    FgBlack = "\x1b[30m",
    FgRed = "\x1b[31m",
    FgGreen = "\x1b[32m",
    FgYellow = "\x1b[33m",
    FgBlue = "\x1b[34m",
    FgMagenta = "\x1b[35m",
    FgCyan = "\x1b[36m",
    FgWhite = "\x1b[37m",

    BgBlack = "\x1b[40m",
    BgRed = "\x1b[41m",
    BgGreen = "\x1b[42m",
    BgYellow = "\x1b[43m",
    BgBlue = "\x1b[44m",
    BgMagenta = "\x1b[45m",
    BgCyan = "\x1b[46m",
    BgWhite = "\x1b[47m",
}

export const LoggerColorConfig = {
    'debug': LoggerColor.FgCyan,
    'error': LoggerColor.FgRed,
    'info': LoggerColor.FgBlue,
    'warning': LoggerColor.FgMagenta,
    'route': LoggerColor.FgYellow,
    'normal': LoggerColor.Reset,
}

export const getLoggerColor = (level:string) =>{
    return LoggerColorConfig[(level as keyof typeof LoggerColorConfig)] ?? LoggerColor.Reset
}


export class Logger {
    private label: string
    public constructor(label: string, color?:LoggerColor) {
        this.label = label;
    }

    public log = ({level, response, title, data, logEntireData}: {level?: keyof typeof LoggerColorConfig | string, response?: Response, title?: string, data: any, logEntireData?: boolean}): void =>{
        const color = getLoggerColor(level ?? 'normal')
        console.log(color, `[${new Date().toISOString()}] | ${response?.locals?.requestId ?? '0000000'} | ${level ? `[${level.toUpperCase()}] | ` : ''}${this.label} ${title ? `| ${title}` : ''}`)
        console.log(LoggerColor.Reset, util.inspect(data, {showHidden: true, depth: logEntireData ? null : 0, colors: true}))
    }

    public logExpressRoute = (request: Request, response: Response, next: NextFunction) => {
        console.log(getLoggerColor('route'),`[${new Date().toISOString()}] | ${response.locals.requestId} | [ROUTE] ========== ${request.originalUrl} ========== `)
        next();
    }
}

const genRand = (len: number) => {
    return Math.random().toString(36).substring(2, len + 2);
}

export const generateUniqueRequestId = (request: Request, response: Response, next: NextFunction) => {
    response.locals.requestId = genRand(7)
    next();
}