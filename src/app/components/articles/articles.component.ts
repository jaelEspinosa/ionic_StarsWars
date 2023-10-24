import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { Data } from 'src/app/interfaces/starsWars';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent  implements OnInit, OnChanges {

  @Input() characters:Data[]   = [];

  constructor() { }
  ngOnChanges(changes: SimpleChanges){
    console.log('se detectaron cambios en characters', changes)

  }

  ngOnInit() {}

}
