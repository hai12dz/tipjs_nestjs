import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidatePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const num = Number(value);
    if (Number.isNaN(num)) {
      throw new BadRequestException('Validation failed (numeric string is expected)');
    }
    return num; // hợp lệ thì trả về số
  }
}