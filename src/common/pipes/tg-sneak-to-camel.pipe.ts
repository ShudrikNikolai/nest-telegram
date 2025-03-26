import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

const snakeToCamel = (s: string) =>
  s.replace(/(_\w)/g, (k: string) => k[1].toUpperCase());

@Injectable()
export class SneakCaseToCamelCasePipe implements PipeTransform<string, number> {
  transform(value: any, metadata: ArgumentMetadata): any {
    const camelCaseObj = {};

    for (const key in value) {
      const camelCaseKey = snakeToCamel(key);

      // @ts-ignore
      camelCaseObj[camelCaseKey] = value[key];
    }

    console.log('camelCaseObj >>>>>>', camelCaseObj);

    return camelCaseObj;
  }
}
