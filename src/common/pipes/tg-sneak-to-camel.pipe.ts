import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

const snakeToCamel = (s: string) =>
  s.replace(/(_\w)/g, (k: string) => k[1].toUpperCase());

/*
код говна, но у нас есть гачи
⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⢀⣀⣤⣴⣶⣾⣆⠄⠄⠄⠄⠄
⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠠⣤⣤⣤⠄⢤⣴⣶⣿⣿⣿⢟⣿⣿⣿⠄⠄⠄⠄⠄
⠄⠄⠄⠄⠄⣀⣠⣤⡾⢏⢠⣶⣶⣾⡑⡀⢸⠋⠁⠄⢠⣾⣿⣿⣿⠄⠄⠄⠄⠄
⠄⢀⣠⣶⣿⣿⣿⠟⠁⠁⠰⣋⢫⢲⡇⠛⠄⠄⢀⣠⣤⣉⠻⠿⠿⠄⠄⠄⠄⠄
⢰⣿⣿⣟⣋⣉⣁⠄⠄⠄⠄⠻⣆⣂⡕⠼⠂⠉⣿⣿⡇⢏⠉⠉⠁⠄⠄⠄⠄⠄
⠄⠙⢿⣿⣿⣿⣿⠃⢸⢋⡁⢊⠒⣲⡶⠊⢁⣴⣿⣿⣿⣦⣦⠄⠄⠄⠄⠄⠄⠄
⠄⠄⠄⠙⠻⣿⡟⠄⡆⢸⣧⣾⣶⣤⣤⣾⡿⣿⣿⠿⡻⣻⣿⠁⠄⠄⠄⠄⠄⠄
⠄⠄⠄⠄⠄⠄⠄⠘⠠⣾⣿⣿⡿⠿⠿⣥⣾⣿⠿⣛⠅⢰⣗⠄⠄⠄⠄⠄⠄⠄
⠄⠄⠄⠄⠄⠄⠄⠄⠄⠸⣶⣶⣿⣟⣛⣛⣛⠲⠿⣵⣿⣟⢅⠂⠄⠄⠄⠄⠄⠄
⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⢹⡟⠋⣠⣤⣤⣤⣍⡑⠂⠬⢉⣾⠄⠄⠄⠄⠄⠄⠄
⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⢠⠁⣿⣿⣿⣿⠿⠿⠿⠿⠷⢶⡄⠄⠄⠄⠄⠄⠄⠄
⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠘⠄⢉⣁⣀⣤⣤⣤⣤⣤⣤⣤⠄⠄⠄⠄⠄⠄⠄⠄
⠄⠄⠄⠄⠄⠄⠄⠄⠄⣀⠈⠙⠿⣿⣿⣿⣿⡍⠟⢁⣠⣤⣶⣶⣤⣄⡀⠄⠄⠄
⠄⠄⠄⠄⠄⠄⠄⢀⣾⣿⣿⣷⣦⣀⠉⠿⣿⡇⠄⣾⣿⣿⣿⣿⣿⣿⣿⣶⡀⠄
⠄⠄⠄⠄⠄⠄⢠⣾⣿⣿⣿⣿⣿⣿⣷⡄⠹⠇⢰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠄
⠄⠄⠄⠄⠄⠄⣾⣿⣿⣿⣿⣿⣿⣿⡿⠋⠄⠄⠈⠙⠿⢿⣿⣿⣿⣿⣿⣿⣿⡇
* */
@Injectable()
export class SneakCaseToCamelCasePipe implements PipeTransform<string, number> {
  transform(value: any, metadata: ArgumentMetadata): any {
    const camelCaseObj = {};

    for (const key in value) {
      const camelCaseKey = snakeToCamel(key);

      // @ts-ignore
      camelCaseObj[camelCaseKey] = value[key];
    }

    return camelCaseObj;
  }
}
