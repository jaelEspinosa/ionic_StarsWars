import { Component, Input, OnInit, inject } from '@angular/core';
import { ActionSheetButton, ActionSheetController } from '@ionic/angular';


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
  public favoriteCards : Data[] = []

  public actionCtrl = inject ( ActionSheetController )

  public buttons:  ActionSheetButton<any>[] = [];

  constructor() { }

  ngOnInit() {
     if(localStorage.getItem('favorites')){
       this.favoriteCards = JSON.parse(localStorage.getItem('favorites')!)
     }

     let existeItem:boolean = false

    this.favoriteCards.forEach(item => {
      if(item._id === this.character._id){
        existeItem = true;
      }
    })
   if(existeItem){
    this.buttons = [
      {
        text:'Share',
        icon: 'share-outline',
        handler:()=>this.onShareArticle()
      },
      {
        text:'Remove',
        icon: 'heart',
        handler:()=>this.removeFavorite()
      },
      {
        text:'Cancel',
        icon: 'close-outline',
        role:'cancelar'
      }
    ]
   }else{
    this.buttons = [
      {
        text:'Share',
        icon: 'share-outline',
        handler:()=>this.onShareArticle()
      },
      {
        text:'Favorite',
        icon: 'heart-outline',
        handler:()=>this.onToggleFavorite()
      },
      {
        text:'Cancel',
        icon: 'close-outline',
        role:'cancelar'
      }
    ]
   }
  }

  async onOpenMenu(){
    const actionSheet = await this.actionCtrl.create({
      header:'Opciones',
      mode:'ios',
      cssClass:'myActSheet',

      buttons: this.buttons
    })
   await actionSheet.present()
  }

  onShareArticle(){
    console.log('Shared Article')
  }

  onToggleFavorite() {

    if(localStorage.getItem('favorites')){
      this.favoriteCards = JSON.parse(localStorage.getItem('favorites')!)
    }
    let existeItem:boolean = false

    this.favoriteCards.forEach(item => {
      if(item._id === this.character._id){
        existeItem = true;
      }
    })
    if (!existeItem){
      this.favoriteCards.push(this.character)
      localStorage.setItem('favorites',JSON.stringify(this.favoriteCards))
      this.favoriteCards = JSON.parse(localStorage.getItem('favorites')!)
    }
  }

  removeFavorite(){
    const NewFavorites = this.favoriteCards.filter(item=>item._id !== this.character._id);
    localStorage.setItem('favorites', JSON.stringify(NewFavorites))
  }
}
