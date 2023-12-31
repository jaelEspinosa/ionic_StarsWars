import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent  implements OnInit {

  @Input() message:string = '';
  public progress:number = 0.01;
  public buffer: number = 0.5
  constructor() { }

  ngOnInit() {

  }

}
