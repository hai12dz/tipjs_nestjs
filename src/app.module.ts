import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketModule } from './ticket/ticket.module';
import { OrderModule } from './order/order.module';
import { LogMiddleware } from './log.middleware';
import { APP_GUARD } from '@nestjs/core';
import { LoginGuardTsGuard } from './login.guard.ts.guard';
import { UserModule } from './user/user.module';
// import { DbService } from './db/db.service';

@Module({
  imports: [TicketModule, OrderModule, UserModule],
  controllers: [AppController],
  providers: [
    { provide: 'app_service', useClass: AppService },
    {
      provide: 'user',
      useValue: { name: 'John Doe', age: 30 },

    },
    {
      provide: 'user2',
      useFactory: async () => {
        return { name: 'Jane Doe', age: 25 };
      }
    },
    {
      provide: 'new_user',
      useFactory: (user, appService) => {
        return {
          name: user.name + ' Smith',
          helloService: appService.getHello()
        }
      },
      inject: ['user', 'app_service']
    },
    //guard global
    { provide: APP_GUARD, useClass: LoginGuardTsGuard },
    // Remove DbService here; it is provided by DbModule.register() within modules that import it
  ],
}
)
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LogMiddleware)
      .forRoutes('api/m10');
  }
}
