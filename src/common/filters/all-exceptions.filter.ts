import { ArgumentsHost, Catch, HttpException, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request, Response } from 'express';
import { ResultFactory } from '../results/results.factory';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request: Request = ctx.getRequest<Request>();
    const response: Response = ctx.getResponse<Response>();
    const status: number = exception instanceof HttpException? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    console.log(exception);
    
    response
      .status(status)
      .json(ResultFactory.getFailureResult(exception.message));
  }
}
