import {
  Component,
  OnInit,
  OnChanges,
  ViewChild,
  Inject,
  inject,
} from '@angular/core';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap/';
import { MAIN_SERVICE } from './main.config';
import { StatusCode } from '../enums/statusCodeEnum';
import { AlertType } from '../enums/alertTypeEnum';
import { IAlertMessage } from '../interfaces/IAlertMessage';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  formSettings;
  markers;
  results;
  alertMessage: IAlertMessage;

  constructor(@Inject(MAIN_SERVICE) private mainService) {
    this.alertMessage = { message: undefined, type: undefined };
  }
  ngOnInit(): void {}

  transferData(info) {
    this.formSettings = info;
  }

  exacuteRequest(req) {
    this.results = [];
    this.mainService.exacuteHttpRequest(req).subscribe((res: any) => {
      this.alertNotification(res.status);
      if (res.status !== StatusCode.Success) {
        this.markers = undefined;
      } else {
        if (res.headers.get('Content-Type') === 'text/csv') {
          this.downloadFile(res.body);
        } else {
          this.markers = this.extactMarkers(res.body);
          this.results = res.body;
        }
      }
    });
  }

  private downloadFile(data) {
    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    // solution i found to for costum naming of file
    var fileLink = document.createElement('a');
    fileLink.href = url;
    fileLink.download = 'report.csv';
    fileLink.click();
    fileLink.remove();
  }

  private alertNotification(statusCode) {
    let msg;
    if (statusCode === StatusCode.NotFound) {
      msg = 'Not Found';
      this.alertMessage.type = AlertType.Error;
    } else if (
      statusCode === StatusCode.ServerError ||
      statusCode === StatusCode.ServerDownAngular
    ) {
      // 0  means server down
      msg = 'Server Error';
      this.alertMessage.type = AlertType.Error;
    } else if (
      statusCode === StatusCode.Created ||
      statusCode === StatusCode.DeletedOrUpdate
    ) {
      this.alertMessage.type = AlertType.Success;
      msg = 'Operation Complete Successfully';
    }
    this.alertMessage.message = msg;
    setTimeout(() => {
      this.alertMessage.message = undefined;
      this.alertMessage.type = undefined;
    }, 3000);
  }

  private extactMarkers(results) {
    let tempMarkers = [];
    tempMarkers = results.map((obj) => {
      if (obj.geoLocation !== undefined) {
        return [obj.geoLocation.lat, obj.geoLocation.lon];
      }
    });
    return tempMarkers[0] === undefined ? undefined : tempMarkers;
  }
}
