import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ZodObject } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodObject<any>) {}

  transform(value: any, metadata: ArgumentMetadata) {
    try {
      if (metadata.type === 'body') {
        this.schema.parse(value);
      }
    } catch (error: any) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }
}
