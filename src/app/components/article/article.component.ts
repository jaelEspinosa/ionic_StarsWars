import { Component, Input, OnInit, inject } from '@angular/core';
import { ActionSheetButton, ActionSheetController, ToastController } from '@ionic/angular';

import { Share } from '@capacitor/share';

import { Data } from 'src/app/interfaces/starsWars';
import { FavoritesService } from 'src/app/services/favorites.service';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent  implements OnInit {

  @Input() character!: Data
  @Input() i!: number
  constructor() { }

  ngOnInit() {


    this.buttons = [];
   }

  public imageLoaded: boolean = false;
  public favoriteCards : Data[] = []


  private actionCtrl = inject ( ActionSheetController )
  private toastCtrl = inject ( ToastController)
  private favoriteSvc = inject ( FavoritesService )

  public buttons:  ActionSheetButton<any>[] = []
  public existsFavorite: boolean = false;




  async onOpenMenu(){

    const existsFavorite = this.favoriteSvc.currentFavorites.some(favorite => favorite._id === this.character._id)
    const actionSheet = await this.actionCtrl.create({
      header:'Opciones',
      mode:'ios',
      cssClass:'myActSheet',

      buttons: [
        {
          text:'Share',
          icon: 'share-outline',
          handler:()=>this.onShareArticle()
        },
        {
          text: !existsFavorite ? 'Favorite' : 'Remove',
          icon: existsFavorite ? 'heart' : 'heart-outline',
          handler:()=>this.onToggleFavorite()
        },
        {
          text:'Cancel',
          icon: 'close-outline',
          role:'cancelar'
        }
      ]
    })
   await actionSheet.present()
  }

  async onShareArticle(){
    await Share.share({
      text:'Shared from "StarWars DataBank"',
      url: this.character.image
    })
  }

  onToggleFavorite() {
    const existsFavorite = this.favoriteSvc.currentFavorites.some(favorite => favorite._id === this.character._id)

    const message = existsFavorite ? 'Removed from favorites' : 'Added to favorites'
    const cssClass = existsFavorite ? 'removed-favorite-toast' : 'added-favorite-toast'
   this.favoriteSvc.saveRemoveCharacter(this.character)
   this.presentToast( message, cssClass );

  }



  async presentToast(message: string, cssClass: string) {
    console.log(cssClass)
    const toast = await this.toastCtrl.create({
      duration:1500,
      position:'middle',
      header: this.character.name,
      cssClass,
      animated:true,
      message

    });

    await toast.present();
  }
}
