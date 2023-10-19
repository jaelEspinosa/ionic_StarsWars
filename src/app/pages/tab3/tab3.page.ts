import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Data } from 'src/app/interfaces/starsWars';

import { StarsWarsService } from 'src/app/services/stars-wars.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  @ViewChild( IonInfiniteScroll ) infiniteScroll!: IonInfiniteScroll

  constructor() {}


  ngOnInit(){
    this.starSvc.getDataByCategory( this.selectedCategory )
      .subscribe(data => {
        this.cards = data
      })
  }

  public starSvc = inject ( StarsWarsService )

  public finalData: string = ''

  public cards : Data[]  = []

  public categories: string[] = [
    'species', 'creatures','droids'
  ]

  public selectedCategory: string = this.categories[0];

  segmentChanged(event: Event) {

    this.selectedCategory = (event as CustomEvent).detail.value

    this.starSvc.getDataByCategory( this.selectedCategory )
      .subscribe(resp => {
        this.cards = resp

        if(resp[resp.length-1].lastItem){
          this.infiniteScroll.disabled = true;
          this.finalData = 'No more data...'
        }else{
          this.infiniteScroll.disabled = false;
          this.finalData = '';
        }
      })
  }


  loadData(){



      this.starSvc.getDataByCategory( this.selectedCategory, true)
        .subscribe(resp =>{

          if(resp[resp.length-1].lastItem){
            this.infiniteScroll.disabled = true;
            this.finalData = 'No more data...'
          }else{
            this.infiniteScroll.disabled = false;
            this.finalData = '';
          }
          setTimeout(() => {
          this.cards = resp;
          this.infiniteScroll.complete()
        }, 500);
        })

  }
}
