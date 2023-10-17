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

    this.starsSvc.getDataByCategory(this.selectedCategory)
   .subscribe(resp => {
     this.cards = resp

   })

  }

 loadData( event: any ) {

   setTimeout(() => {
    this.starsSvc.getDataByCategory(this.selectedCategory, true)
      .subscribe(resp => {
        console.log(resp)
        if(resp[resp.length-1].lastItem){
          event.target.disabled = true;
          this.finalData = 'No more data...'
        }else{
          event.target.disabled = false;
          this.finalData = '';
        }
        this.cards = resp;
        event.target.complete()

      })
   }, 800);


}


}

