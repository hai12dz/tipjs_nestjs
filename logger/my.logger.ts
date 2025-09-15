import { LoggerService, LogLevel } from "@nestjs/common";

export class MyLogger implements LoggerService {
    log(message: string, context: string) {
        console.log(`*****INFO*****${context ? ' [' + context + ']' : ''} ${message}`);
    }
    error(message: string, context: string) {
        console.log(`*****ERROR*****${context ? ' [' + context + ']' : ''} ${message}`);
    }
    warn(message: string, context: string) {
        console.log(`*****WARN*****${context ? ' [' + context + ']' : ''} ${message}`);
    }
    debug?(message: string, context: string) {
        console.log(`*****DEBUG*****${context ? ' [' + context + ']' : ''} ${message}`);
    }
    verbose?(message: string, context: string) {
        console.log(`*****VERBOSE*****${context ? ' [' + context + ']' : ''} ${message}`);
    }
    fatal?(message: string, context: string) {
        console.log(`*****FATAL*****${context ? ' [' + context + ']' : ''} ${message}`);
    }
    setLogLevels?(levels: LogLevel[]) {
        throw new Error("Method not implemented.");
    }
}