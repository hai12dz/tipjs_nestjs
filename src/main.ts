import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoginGuardTsGuard } from './login.guard.ts.guard';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule,
    {
      //logger: new MyLogger(), //custom logger
      bufferLogs: true,
    }
  );
  app.useLogger(app.get('MyLoggerDev'));
  app.useStaticAssets(join(__dirname, '../uploads'), { prefix: '/uploads' });
  //add middleware global

  // app.use((req: Request, res: Response, next: Function) => {
  //   console.log('Request before...');
  //   next();
  //   console.log('Response after...');
  // });
  //add guard global
  //  app.useGlobalGuards(new LoginGuardTsGuard());
  //enable cors
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
