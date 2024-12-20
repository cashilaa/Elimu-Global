import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const compression = require('compression');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  });
  
  // Add global prefix
  app.setGlobalPrefix('api');
  
  // Enable compression without type assertion
  app.use(compression());
  
  // Enable CORS with production configuration
  app.enableCors({
    origin: process.env.FRONTEND_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  
  // Use environment port or default to 3000
  const port = process.env.PORT || 3000;
  
  await app.listen(port, '0.0.0.0');
  console.log(`Application is running on port ${port}`);
}

// Error handling
bootstrap().catch(err => {
  console.error('Failed to start the application:', err);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});
