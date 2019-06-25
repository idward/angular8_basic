import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterRecipes',
  pure: false // decrease the performance of web to trigger dom updated when adding other datas
})
export class RecipePipe implements PipeTransform {
  transform(value: any, key: string, field: string): any {
    if (value.length === 0) {
      return value;
    }
    const filteredValue = [];
    for (const item of value) {
      if (item[field].toLowerCase().includes(key)) {
        filteredValue.push(item);
      }
    }
    return filteredValue;
  }
}
