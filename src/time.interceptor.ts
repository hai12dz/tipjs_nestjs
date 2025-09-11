import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';

@Injectable()
export class TimeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    // const startTime = Date.now();
    // return next.handle().pipe(tap(() => {
    //   const endTime = Date.now();
    //   const processingTime = endTime - startTime;
    //   console.log(`Request processing time: ${processingTime}ms`);
    // }));
    return next.handle().pipe(
      map((data) => {
        return {
          data,
          time: new Date().toISOString(),
          success: true
        };
      })
    );

  }
}
