import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoginGuardTsGuard } from './login.guard.ts.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //add middleware global

  app.use((req: Request, res: Response, next: Function) => {
    console.log('Request before...');
    next();
    console.log('Response after...');
  });
  //add guard global
  //  app.useGlobalGuards(new LoginGuardTsGuard());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
