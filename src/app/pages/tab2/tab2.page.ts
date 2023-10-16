import { Component, OnInit, inject } from '@angular/core';

import { Data } from 'src/app/interfaces/starsWars';

import { StarsWarsService } from 'src/app/services/stars-wars.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  public finalData: string = ''


  public starsSvc = inject ( StarsWarsService )

  public cards : Data[]  = []

  public categories: string[] = [
    'organizations', 'locations','vehicles'
  ]

  public selectedCategory: string = this.categories[0];

  constructor() {}

  ngOnInit() {
   this.starsSvc.getDataByCategory(this.selectedCategory)
   .subscribe(res => {
     this.cards = res
   })
  }

  segmentChanged( event: Event ) {
    this.selectedCategory = ( event as CustomEvent ).detail.value

    console.log('la categoria es... ',this.selectedCategory)
    this.starsSvc.getDataByCategory(this.selectedCategory)
   .subscribe(res => {
     this.cards = res
     console.log(this.cards)
   })

  }

 loadData( event: any ) {
 /*  console.log( this.articles[this.articles.length-1].title)
  setTimeout(() => {

    this.newsSvc.getTopHeadlinesByCategory( this.selectedCategory, true)
    .subscribe( articles => {

      if (this.articles[this.articles.length-1].title === articles[articles.length-1].title ){
        event.target.disabled = true;
        this.finalData = 'Has llegado al final!'
        return
      }
      this.articles = articles;

      event.target.complete();
    })
  }, 700);
 */
}


}

