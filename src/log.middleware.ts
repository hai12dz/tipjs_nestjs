import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LogMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log(`[${new Date().toISOString()}] Request before...`);
    next();
    console.log(`[${new Date().toISOString()}] Response after...`);
  }
}
