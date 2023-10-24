import { Component, OnInit } from '@angular/core';
import { Data } from 'src/app/interfaces/starsWars';


@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor() { }

  public favoriteCards : Data[] = []


  ngOnInit() {
    if(localStorage.getItem('favorites')){
       this.favoriteCards = JSON.parse(localStorage.getItem('favorites')!)
     }
  }

}
