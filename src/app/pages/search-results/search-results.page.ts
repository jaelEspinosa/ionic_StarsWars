import { Location } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  private location = inject ( Location )

  public finalData: string = '';

  public termOfSearch: string = ''
  public category: string= '';
  public searchResults: Data[] = []

  public page: number = 1
  public totalItems:number = Number(localStorage.getItem('totalItems'));
  public totalPages:number = 0;
  public isLoadingData: boolean = true
  public message:string = '';




  ngOnInit() {
    this.route.params.subscribe(params => {
      this.termOfSearch = params['name'];
      this.category = params['category'];
      this.message = `Searching for "${this.termOfSearch}"`;
      this.isLoadingData = true;
    });

    if (this.totalItems) {
      this.totalPages = Math.round(this.totalItems/10)
      if(this.totalItems > Math.round(this.totalItems/10) ){
        this.totalPages += 1
      }
    }

    this.starWarsSvc.getAllCardsAndFindByname(this.termOfSearch, this.category)
     .subscribe(resp => {
       this.searchResults = resp
       this.isLoadingData = false
     })
  }

  goBack(){
    this.location.back()
  }

}
