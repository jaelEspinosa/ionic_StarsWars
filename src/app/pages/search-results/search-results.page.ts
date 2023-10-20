import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { Data } from 'src/app/interfaces/starsWars';
import { StarsWarsService } from 'src/app/services/stars-wars.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.page.html',
  styleUrls: ['./search-results.page.scss'],
})
export class SearchResultsPage implements OnInit {

  constructor() {}



  private route = inject ( ActivatedRoute )
  private starWarsSvc = inject ( StarsWarsService )

  public finalData: string = '';

  public termOfSearch: string = ''
  public searchResults: Data[] = []

  public page: number = 1
  public totalItems:number = Number(localStorage.getItem('totalItems'));
  public totalPages:number = 0;





  ngOnInit() {
    this.route.params.subscribe(params => {
      this.termOfSearch = params['name'];
    });

    if (this.totalItems) {
      this.totalPages = Math.round(this.totalItems/10)
      if(this.totalItems > Math.round(this.totalItems/10) ){
        this.totalPages += 1
      }
    }

    this.starWarsSvc.getAllCardsAndFindByname(this.termOfSearch)
     .subscribe(resp => {
       this.searchResults = resp
     })
  }

  loadData() {
    this.starWarsSvc.getAllCardsAndFindByname(this.termOfSearch, true)
     .subscribe(resp => {
      setTimeout(() => {
        this.searchResults = resp;
        this.page += 1
        if( this.page >= this.totalPages){
          this.finalData = 'No More Data...'
        }
      }, 500);
      console.log(this.searchResults)

    })
  }

}
