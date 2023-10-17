import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-button-sound',
  templateUrl: './button-sound.component.html',
  styleUrls: ['./button-sound.component.scss'],
})
export class ButtonSoundComponent  implements AfterViewInit{

  @ViewChild('backgroundMusic') backgroundMusic!: ElementRef<HTMLAudioElement>;



  public audio!: HTMLAudioElement;

  isPlaying: boolean = true;


  constructor() { }

  ngAfterViewInit() {
    const audio = this.backgroundMusic.nativeElement;
    audio.volume = 0.5;
    audio.play();
  }



  toggleAudio() {
    const audio = this.backgroundMusic.nativeElement;


    if (this.isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    this.isPlaying = !this.isPlaying;
  }

}
