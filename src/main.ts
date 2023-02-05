import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';
import * as expressBasicAuth from 'express-basic-auth';

async function bootstrap() {
  const APPLICATION_NAME: string = process.env.APPLICATION_NAME;
  const APPLICATION_DESCRIPTION: string = process.env.APPLICATION_DESCRIPTION;
  const APPLICATION_VERSION: string = process.env.APPLICATION_VERSION;
  const PORT = process.env.PORT;

  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.useGlobalInterceptors(new LoggingInterceptor());

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new AllExceptionsFilter());

  // security for swagger
  app.use(
    ['/auth-docs', 'docs-json'],
    expressBasicAuth({
      challenge: true,
      users: { [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD },
    }),
  );

  // documentation
  const swaggerConfig = new DocumentBuilder()
    .setTitle(APPLICATION_NAME)
    .setDescription(APPLICATION_DESCRIPTION)
    .setVersion(APPLICATION_VERSION)
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT Token',
        in: 'header',
      },
      'accesskey',
    )
    .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(
    app,
    swaggerConfig,
  );
  SwaggerModule.setup('auth-docs', app, document);

  await app.listen(PORT);
}
bootstrap();
