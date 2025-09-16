import { LoggerService, LogLevel } from "@nestjs/common";
import * as dayjs from "dayjs";
import { createLogger, format, Logger, transports } from "winston";
// ...existing code...
// removed: import chalk from 'chalk';
// Dùng require với fallback (tránh ERR_REQUIRE_ESM khi đang dùng chalk v5)
let chalk: { green: (s: string) => string; yellow: (s: string) => string };
try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    chalk = require('chalk'); // hoạt động tốt với chalk@4 (CJS)
} catch {
    // fallback không màu nếu chalk v5 (ESM) gây lỗi require
    chalk = { green: (s) => s, yellow: (s) => s };
}
// ...existing code...

export class MyLogger implements LoggerService {

    private logger: Logger;

    constructor() {
        this.logger = createLogger({
            level: 'debug',
            transports: [
                new transports.Console({
                    format: format.combine(
                        format.colorize({ all: true }),
                        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
                        format.printf((info) => {
                            const { level, message, timestamp, context } = info as any;
                            const strApp = chalk.green('[NEST]');
                            const strContext = context ? chalk.yellow(`[${context}]`) : '';
                            return `${strApp} - ${timestamp} ${level} ${strContext} - ${message}`;
                        })
                    )
                }),
                new transports.File({ format: format.combine(format.timestamp(), format.json()), dirname: 'log', filename: 'demo.dev.log' }),
            ]
        });
    }

    log(message: string, context: string) {
        const time = dayjs(Date.now()).format('DD/MM/YYYY HH:mm:ss');
        // ...existing code...
        this.logger.info(message, { context, time });
        // ...existing code...
    }
    error(message: string, context: string) {
        const time = dayjs(Date.now()).format('DD/MM/YYYY HH:mm:ss');

        // ...existing code...
        this.logger.error(message, { context, time });
        // ...existing code...
    }
    warn(message: string, context: string) {
        const time = dayjs(Date.now()).format('DD/MM/YYYY HH:mm:ss');

        // ...existing code...
        this.logger.warn(message, { context, time });
        // ...existing code...
    }
    debug?(message: string, context: string) {
        const time = dayjs(Date.now()).format('DD/MM/YYYY HH:mm:ss');

        // ...existing code...
        this.logger.debug(message, { context, time });
        // ...existing code...
    }
    verbose?(message: string, context: string) {
        const time = dayjs(Date.now()).format('DD/MM/YYYY HH:mm:ss');
        // ...existing code...
        this.logger.verbose(message, { context, time });
        // ...existing code...
    }
    fatal?(message: string, context: string) {
        const time = dayjs(Date.now()).format('DD/MM/YYYY HH:mm:ss');

        // ...existing code...
        this.logger.error(message, { context, time });
        // ...existing code...
    }
    setLogLevels?(levels: LogLevel[]) {
        throw new Error("Method not implemented.");
    }
}