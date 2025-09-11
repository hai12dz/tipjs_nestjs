import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AppService } from './app.service';

@Injectable()
export class LoginGuardTsGuard implements CanActivate {
  @Inject('app_service') private readonly appService: AppService

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    console.log('m10 return 403 forbidden');

    return true;
  }
}
