import { Injectable, inject } from '@angular/core';
import { Data } from '../interfaces/starsWars';
import { Storage } from '@ionic/storage-angular';



@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private storage = inject( Storage )

  constructor() {
    this.init();

  }

  async init(){
    const storage = await this.storage.create()
    this.loadFavorites();
  }

  private _currentFavorites: Data[] = []



  get currentFavorites():Data[] {
    return [...this._currentFavorites] //hago visible esta variabel en un nuevo objeto.
  }



  async saveRemoveCharacter( character: Data ){

    const exists = this._currentFavorites.find(currentFavorite => currentFavorite._id === character._id)// compruebo si existe

    if(exists){
      this._currentFavorites = this._currentFavorites.filter( currentFavorite => currentFavorite._id !== character._id) // si existe lo elimino
    } else {
      this._currentFavorites = [ character, ...this._currentFavorites]
    }

    this.storage.set('favorites',this._currentFavorites)
  }


  async loadFavorites() {
    try {
      const favorites = await this.storage.get('favorites')
      this._currentFavorites = favorites || [];
    } catch (error) {
      console.log(error)
    }

}

}
