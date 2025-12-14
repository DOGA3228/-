import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // ✅ CORS конфигурация для Frontend на localhost:5173
  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Swagger конфигурация
  const config = new DocumentBuilder()
    .setTitle('Furniture Accounting API')
    .setDescription(
      'REST API для управления мебелью, цехами производства и материалами',
    )
    .setVersion('1.0.0')
    .addTag('products', 'Управление продуктами')
    .addTag('product-types', 'Управление типами продуктов')
    .addTag('materials', 'Управление материалами')
    .addTag('workshops', 'Управление цехами')
    .addTag('product-workshops', 'Управление производством')
    .addTag('raw-materials', 'Расчет сырья')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      displayOperationId: true,
    },
    customCss: '.swagger-ui .topbar { display: none }',
    customfavIcon: 'https://nestjs.com/img/logo_text.svg',
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`
╔═════════════════════════════════════════════════════════════╗
║                                                             ║
║ 🚀 Furniture Accounting API is running!                    ║
║                                                             ║
║ 🌐 Application URL: http://localhost:${port}              ║
║ 📚 Swagger Docs: http://localhost:${port}/api/docs        ║
║ ✅ CORS Enabled for: http://localhost:5173                ║
║                                                             ║
║ Environment: ${process.env.NODE_ENV || 'development'}                        ║
║                                                             ║
╚═════════════════════════════════════════════════════════════╝
  `);
}

bootstrap().catch((error) => {
  console.error('Failed to start application:', error);
  process.exit(1);
});
