import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab0PageRoutingModule } from './tab0-routing.module';

import { Tab0Page } from './tab0.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    Tab0PageRoutingModule
  ],
  declarations: [Tab0Page]
})
export class Tab0PageModule {}
