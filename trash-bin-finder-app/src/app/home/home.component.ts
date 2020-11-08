import { Component, OnInit ,Inject} from '@angular/core';
import {HOME_CONFIG} from './home.config'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor( @Inject(HOME_CONFIG) private config) {}
  homePageMsg;
  ngOnInit()  {
    this.homePageMsg = this.config.msg;
  }
}
