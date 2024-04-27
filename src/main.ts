import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as cookieParser from 'cookie-parser';
import * as fs from 'fs';
import * as enforce from 'express-sslify';
import * as http from 'http';
import * as https from 'https';
import { HttpExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
  //const keyFile = fs.readFileSync(__dirname + '/../ssl/private.key');
  //const certFile = fs.readFileSync(__dirname + '/../ssl/certificate.crt');

  const app = await NestFactory.create<NestExpressApplication>(
    AppModule /*, {
    httpsOptions: {
      key: keyFile,
      cert: certFile,
    },
  }*/,
  );

  //app.use(enforce.HTTPS({ trustProtoHeader: true }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors();
  app.use(cookieParser());
  app.useStaticAssets(join(__dirname, '..', 'public'));

  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('pug');

  await app.listen(443);

  /*const httpServer = http.createServer((req, res) => {
    res.writeHead(301, { Location: 'https://' + req.headers.host + req.url });
    res.end();
  });

  httpServer.listen(80, () => {
    console.log('HTTP server running on port 80');
  });*/
}

bootstrap();
