import { Component, OnInit, inject } from '@angular/core';
import { Data } from 'src/app/interfaces/starsWars';
import { FavoritesService } from 'src/app/services/favorites.service';


@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page {
  private favoritesSVc = inject( FavoritesService)

  constructor() { }

 get favoriteCards() : Data[] {
  return this.favoritesSVc.currentFavorites
 }

}
