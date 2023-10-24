import { Component, Input, OnInit } from '@angular/core';


import { Data } from 'src/app/interfaces/starsWars';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent  implements OnInit {

  @Input() character!: Data
  @Input() i!: number

  public imageLoaded: boolean = false;

  constructor() { }

  ngOnInit() {


  }

}
