import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';

import { QueryFormComponent } from './query-form/query-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ResultComponent } from './result/result.component';
import { MapComponent } from './map/map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { SeperateConcatWordsPipe } from '../pipes/seperate-concat-words.pipe';
import { SidenavComponent } from './sidenav/sidenav.component';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { MAP_CONFIG, SERVER_CONFIG, MAIN_SERVICE, SIDENAV_CONFIG, STATUS_CODE_ENUM } from './main.config';
import { mapConfig } from '../../static/main/map';
import { sidenavSettings } from '../../static/main/sidenavConfig';
import {serverConfig} from '../../static/main/server';
import {MainService} from './main.service';
import {StatusCode} from '../enums/statusCodeEnum';

@NgModule({
  declarations: [
    MainComponent,
    QueryFormComponent,
    ResultComponent,
    MapComponent,
    SeperateConcatWordsPipe,
    SidenavComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    LeafletModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    NgbAlertModule,
  ],
  providers: [
    { provide: MAP_CONFIG, useValue: mapConfig },
    { provide: SIDENAV_CONFIG, useValue: sidenavSettings },
    {provide: SERVER_CONFIG,useValue:serverConfig},
    {provide:MAIN_SERVICE,useClass:MainService},
    {provide: STATUS_CODE_ENUM,useValue:StatusCode}
  ],
})
export class MainModule {}
