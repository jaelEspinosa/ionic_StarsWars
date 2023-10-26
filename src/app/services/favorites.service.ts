import { Injectable } from '@angular/core';
import { Data } from '../interfaces/starsWars';



@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor() {
    this.loadFavorites();
  }

  private _currentFavorites: Data[] = []

  get currentFavorites():Data[] {
    return [...this._currentFavorites] //hago visible esta variabel en un nuevo objeto.
  }



  public saveRemoveCharacter( character: Data ){

    const exists = this._currentFavorites.find(currentFavorite => currentFavorite._id === character._id)// compruebo si existe

    if(exists){
      this._currentFavorites = this._currentFavorites.filter( currentFavorite => currentFavorite._id !== character._id) // si existe lo elimino
    } else {
      this._currentFavorites = [ character, ...this._currentFavorites]
    }

    localStorage.setItem('favorites', JSON.stringify(this._currentFavorites))
  }


  loadFavorites() {
    try {
      const favorites = JSON.parse(localStorage.getItem('favorites')!)
      this._currentFavorites = favorites || [];
    } catch (error) {
      console.log(error)
    }

}

}
