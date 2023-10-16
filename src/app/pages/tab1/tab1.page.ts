import { Component, OnInit, inject } from '@angular/core';

import { Article } from 'src/app/interfaces';
import { StarsWarsService } from 'src/app/services/stars-wars.service';
import { Data } from 'src/app/interfaces/starsWars';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{


  private starsSvc = inject ( StarsWarsService )

  public articles: Article[] = [];
  public characters: Data[] = [];
  public finalData: string = '';

  constructor() {}

  ngOnInit() {

      this.starsSvc.getAllCharacters('characters')
       .subscribe(characters=>{
        this.characters = characters
       })

  }
 loadData( event:any ) {
   console.log(this.starsSvc.lastPage)


      setTimeout(() => {
        this.starsSvc.getAllCharacters('characters',true)
        .subscribe(characters=>{
        this.characters = characters
        event.target.complete()
        })
      }, 1200);

   if(this.starsSvc.lastPage){
    event.target.disabled = true;
    this.finalData = "You have reached the end of the list."
   }
 }



}
