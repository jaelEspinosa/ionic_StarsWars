import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { Data } from 'src/app/interfaces/starsWars';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent  implements OnInit {

 @Input()characters:Data[] = [];

  constructor() { }


  ngOnInit() {}

}
