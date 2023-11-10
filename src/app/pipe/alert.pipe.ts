import { Pipe, PipeTransform } from '@angular/core';
import {Alert} from "../core/api/v1";

@Pipe({
  name: 'alert',
  pure: false
})
export class AlertPipe implements PipeTransform {

  transform(value: Array<Alert>): Array<Alert> {
    return value.sort((a, b) => b.id! - a.id!);
  }

}
