import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoginGuardTsGuard } from './login.guard.ts.guard';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { MyLoggerDev } from '../logger/my.logger.dev';
import { MyLogger } from '../logger/my.logger';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule,
    {
      //logger: new  MyLogger(), // Sử dụng MyLogger tùy chỉnh
      bufferLogs: true,
    }
  );
  app.useLogger(new MyLogger());
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
