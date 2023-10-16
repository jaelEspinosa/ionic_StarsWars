import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {


  constructor() {}

  public categories: string[] = [
    'species', 'creature','droid'
  ]

  public selectedCategory: string = this.categories[0];

  segmentChanged(event: Event) {

  }
}
