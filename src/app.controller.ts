import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(@Inject('app_service') private readonly appService: AppService,
    @Inject('user') private readonly user: { name: string, age: number },
    @Inject('user2') private readonly user2: { name: string, age: number },
    @Inject('new_user') private readonly newUser: { name: string, helloService: string }
  ) { }

  @Inject('app_service')
  private readonly injectedAppService: AppService;


  @Get()
  getHello(): string {
    console.log('Injected user:', this.user);
    console.log('Injected user2:', this.user2);
    console.log('Injected new_user:', this.newUser);
    return this.appService.getHello();
  }
}
