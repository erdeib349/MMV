import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lowercase'
})
export class LowercasePipe implements PipeTransform {

  transform(value: string | null): string {
    console.log('LowercasePipe bemeneti érték:', value);
    const result = value ? value.toLowerCase() : '';
    console.log('LowercasePipe kimeneti érték:', result);

    return result;
  }
}
