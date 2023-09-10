import { Module } from '@nestjs/common';
import { LoggerWinstonSystemService } from './logger-winston-system/logger-winston-system.service';

@Module({
  providers: [LoggerWinstonSystemService],
})
export class LoggingsModule {}
