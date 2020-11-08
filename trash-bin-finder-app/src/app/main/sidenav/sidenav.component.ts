import { Component, OnInit, Output, EventEmitter,Inject } from '@angular/core';
import {SIDENAV_CONFIG} from '../main.config'

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit {
  navbarSettings;
  isDisplayedArray = {};
  navbarFuncSettings;
  
  @Output('function') function: EventEmitter<any> = new EventEmitter();

  constructor(@Inject(SIDENAV_CONFIG) private sidenavSettings) {
    this.navbarSettings = sidenavSettings.htmlsettings;
    this.navbarFuncSettings = sidenavSettings.functionBinding;

    sidenavSettings.htmlsettings.forEach((item) => {
      this.isDisplayedArray[item.title] = {
        display: 'none',
        showSubmenu: false,
      };
    });
  }

  ngOnInit(): void {}

  controlSerachMenu(titleName) {
    if (this.isDisplayedArray[titleName].display === 'none') {
      this.isDisplayedArray[titleName].display = '';
    } else {
      this.isDisplayedArray[titleName].display = 'none';
    }
    this.isDisplayedArray[titleName].showSubmenu = !this.isDisplayedArray[
      titleName
    ].showSubmenu;
  }

  selectQuery(str,method) {
    this.function.emit({...this.navbarFuncSettings[str],method});
  }
}
