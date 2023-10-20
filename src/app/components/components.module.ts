import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleComponent } from './article/article.component';
import { ButtonSoundComponent } from './button-sound/button-sound.component';
import { SpinnerComponent } from './spinner/spinner.component';





@NgModule({
  declarations: [
    ArticlesComponent,
    ArticleComponent,
    ButtonSoundComponent,
    SpinnerComponent

  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[
    ArticlesComponent,
    ButtonSoundComponent,
    SpinnerComponent
  ]
})
export class ComponentsModule { }
