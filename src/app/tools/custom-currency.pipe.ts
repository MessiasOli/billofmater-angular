import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customCurrency'
})
export class CustomCurrencyPipe implements PipeTransform {

  transform(value: number): string {
    if(!value || value == 0) return "R$ 0,00"
    let result = value.toLocaleString("pt-BR", {minimumFractionDigits: 2, maximumFractionDigits: 2})
    return `R$ ${result}`;
  }

}
