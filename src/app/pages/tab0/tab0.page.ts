import { AfterViewInit, Component, ElementRef,  ViewChild, inject } from '@angular/core';





@Component({
  selector: 'app-tab0',
  templateUrl: './tab0.page.html',
  styleUrls: ['./tab0.page.scss'],
})
export class Tab0Page implements  AfterViewInit {

  @ViewChild('backgroundMusic') backgroundMusic!: ElementRef<HTMLAudioElement>;



  public audio!: HTMLAudioElement;

  isPlaying: boolean = true;

  constructor() {


  }

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
