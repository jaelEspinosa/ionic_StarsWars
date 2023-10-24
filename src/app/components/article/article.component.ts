import { Component, Input, OnInit, inject } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';


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

  public actionCtrl = inject ( ActionSheetController )

  constructor() { }

  ngOnInit() {


  }
  async onOpenMenu(){

    const actionSheet = await this.actionCtrl.create({
      header:'Opciones',
      mode:'ios',
      cssClass:'myActSheet',

      buttons:[
        {
          text:'Compartir',
          icon: 'share-outline',
          handler:()=>this.onShareArticle()
        },
        {
          text:'Favorito',
          icon: 'heart-outline',
          handler:()=>this.onToggleFavorite()
        },
        {
          text:'Cancelar',
          icon: 'close-outline',
          role:'cancelar'
        }
      ]
    })
   await actionSheet.present()
  }

  onShareArticle(){
    console.log('Shared Article')
  }

  onToggleFavorite() {
    console.log('Toggled Favorite')
  }
}
