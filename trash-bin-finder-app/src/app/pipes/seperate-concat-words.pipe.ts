import {Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'seperateConcatWords'
})
export class SeperateConcatWordsPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    let str = value;
    for (let i = 1; i < str.length; i++) {
      if (str[i] === str[i].toUpperCase()) {
        str = str.slice(0, i) + ' ' + str.slice(i);
        i++;
      }
    }
    return str;
  }

}
