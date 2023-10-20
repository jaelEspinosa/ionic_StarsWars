import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonInfiniteScroll } from '@ionic/angular';

import { Data } from 'src/app/interfaces/starsWars';

import { StarsWarsService } from 'src/app/services/stars-wars.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  @ViewChild(IonInfiniteScroll) infiniteScroll!: IonInfiniteScroll

  public finalData: string = ''


  public starsSvc = inject ( StarsWarsService )
  private alertCtrl = inject ( AlertController )
  private router = inject ( Router )

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

     if(resp[resp.length-1].lastItem){
      this.infiniteScroll.disabled = true;
      this.finalData = 'No more data...'
    }else{
      this.infiniteScroll.disabled = false;
      this.finalData = '';
    }

   })

  }

 loadData() {


    this.starsSvc.getDataByCategory(this.selectedCategory, true)
      .subscribe(resp => {

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
async showAlert() {
  const alert = await this.alertCtrl.create({
    header: 'Search by Character Name',
    cssClass: 'my-class',
    inputs: [
      {
        name: 'Character',
        placeholder: 'input the Character to search',
        type: 'text',
        attributes: {
          minlength: 4,
          maxlength: 15,
        },
      },
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
      },

      {
        text: 'Search',
        handler: (data) => {
          if (!data.Character) {
            this.showAlert2();
            return;
          }
          this.searchByName(data.Character); // en data tenemos el value del formulario
        },
      },
    ],
  });

  await alert.present();
}

async showAlert2() {
  const alert = await this.alertCtrl.create({
    header: 'No Search Term Writed',
    cssClass: 'my-class-danger',
    buttons: ['Ok'],
  });
  await alert.present();
}

searchByName(name: string) {
    this.router.navigateByUrl(`tabs/search-results/${name}/${this.selectedCategory}`)


}

}

