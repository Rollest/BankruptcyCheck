// https.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class HttpsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Check if the request is not secure (HTTP)
    if (!req.secure) {
      // Redirect to HTTPS
      return res.redirect(301, `https://${req.headers.host}${req.url}`);
    }
    // If the request is already secure (HTTPS), proceed
    next();
  }
}
