import { Component, OnInit, inject } from '@angular/core';

import { Article } from 'src/app/interfaces';
import { StarsWarsService } from 'src/app/services/stars-wars.service';
import { Data } from 'src/app/interfaces/starsWars';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  private starsSvc = inject(StarsWarsService);
  private alertCtrl = inject(AlertController);
  private router = inject ( Router )

  public articles: Article[] = [];
  public characters: Data[] = [];
  public finalData: string = '';

  constructor() {}

  ngOnInit() {
    this.starsSvc.getAllCharacters('characters').subscribe((characters) => {
      this.characters = characters;
    });
  }
  loadData(event: any) {

    setTimeout(() => {
      this.starsSvc
        .getAllCharacters('characters', true)
        .subscribe((characters) => {
          this.characters = characters;
          event.target.complete();
        });
    }, 1200);

    if (this.starsSvc.lastPage) {
      event.target.disabled = true;
      this.finalData = 'You have reached the end of the list.';
    }
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
      this.router.navigateByUrl(`tabs/search-results/${name}`)

  /*   this.starsSvc.getAllCardsAndFindByname(name).subscribe((resp) => {
      console.log('el array de busqueda es: ', resp);
    }); */
  }
}
