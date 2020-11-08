import {
  Component,
  OnChanges,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-query-form',
  templateUrl: './query-form.component.html',
  styleUrls: ['./query-form.component.css'],
})
export class QueryFormComponent implements OnInit, OnChanges {
  checkoutForm;
  @Output('function') function: EventEmitter<any> = new EventEmitter();
  @Input('formSettings') formSettings;

  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {}
  ngOnChanges() {
    if (this.formSettings) {
      let formProps = {};
      this.formSettings.params.forEach((item) => {
        formProps[item.alias] = undefined;
      });
      this.checkoutForm = this.formBuilder.group(formProps);
    }
  }
  OnClick(params, requestProp ,method) {
    if(params.lon!== undefined && params.lat!== undefined){
      params.geoLocation ={lat:params.lat,lon:params.lon}
      delete params.lat
      delete params.lon
    }
    this.function.emit({requestProp,params,method});
  }
}
