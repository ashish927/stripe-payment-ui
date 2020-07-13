import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StripeAuthPage } from './stripe-auth.page';

const routes: Routes = [
  {
    path: '',
    component: StripeAuthPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StripeAuthPage],
})
export class StripeAuthPageModule {}
