import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleComponent } from './article/article.component';
import { ButtonSoundComponent } from './button-sound/button-sound.component';





@NgModule({
  declarations: [
    ArticlesComponent,
    ArticleComponent,
    ButtonSoundComponent

  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[
    ArticlesComponent,
    ButtonSoundComponent
  ]
})
export class ComponentsModule { }
