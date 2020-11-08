import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent implements OnInit, OnChanges {
  @Input('results') rawResults;
  results;

  ngOnInit(): void {
    this.results;
  }
  ngOnChanges(): void {
    if (this.rawResults !== undefined) {
      this.results = this.rawResults.map((obj) => {
        return this.objectDismentel(obj);
      });
    }else{
      
    }
  }

  objectDismentel(obj, keyString = undefined) {
    let nestedResultArray = Object.keys(obj).map((key) => {
      if (typeof obj[key] === 'object') {
        return this.objectDismentel(
          obj[key],
          key.charAt(0).toUpperCase() + key.slice(1)
        );
      }
      return keyString
        ? {
            name: keyString + (key.charAt(0).toUpperCase() + key.slice(1)),
            value: obj[key],
          }
        : { name: key.charAt(0).toUpperCase() + key.slice(1), value: obj[key] };
    });

    return [].concat.apply([], nestedResultArray);
  }

}
