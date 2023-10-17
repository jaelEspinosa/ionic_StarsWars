import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundService {

  public soundDisabled: boolean = false;


  toggleSound() {
    this.soundDisabled = !this.soundDisabled
  }

  constructor() { }
}
