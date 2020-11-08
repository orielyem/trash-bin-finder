import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HOME_CONFIG } from './home.config';
import {config} from '../../static/home/config'


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ],  providers:[{provide:HOME_CONFIG,useValue:config}],
})
export class HomeModule { }
