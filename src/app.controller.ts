import { Controller, Get, Inject, Logger, Query, UseFilters, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { AppService } from './app.service';
import { LoginGuardTsGuard } from './login.guard.ts.guard';
import { TimeInterceptor } from './time.interceptor';
import { ValidatePipe } from './validate.pipe';
import { TestFilter } from './test.filter';

@Controller()
@UseInterceptors(TimeInterceptor)
@UsePipes(ValidatePipe)
export class AppController {
  private logger = new Logger()
  constructor(@Inject('app_service') private readonly appService: AppService,
    @Inject('user') private readonly user: { name: string, age: number },
    @Inject('user2') private readonly user2: { name: string, age: number },
    @Inject('new_user') private readonly newUser: { name: string, helloService: string }
  ) { }

  @Inject('app_service')
  private readonly injectedAppService: AppService;


  @Get()
  getHello(): string {
    this.logger.error('This is an error message');
    return this.appService.getHello();
  }

  @Get('/api/cr7')
  @UseInterceptors(TimeInterceptor)
  getCR7(): string {
    return "hello cr7";
  }

  @Get('/api/m10')
  //  @UseGuards(LoginGuardTsGuard)
  getM10(): string {
    return "hello m10";
  }


  @Get('/api/getnumber')
  @UseFilters(TestFilter)
  getNumber(@Query('value', ValidatePipe) value: number): number {
    return value + 1;
  }






}
