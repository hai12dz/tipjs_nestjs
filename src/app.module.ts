import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketModule } from './ticket/ticket.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [TicketModule, OrderModule],
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
    }
  ],
}
)
export class AppModule { }
