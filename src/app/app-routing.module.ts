import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'stripe',
    pathMatch: 'full'
  },
  {
    path: 'stripe',
    loadChildren: './stripe/stripe.module#StripePageModule'
  },
  {
    path: 'stripe-web',
    loadChildren: './stripe-web/stripe.module#StripePageModule'
  },
  { 
    path: 'stripe-auth', 
  loadChildren: './stripe-auth/stripe-auth.module#StripeAuthPageModule' },
  { path: 'payment-message', loadChildren: './payment-message/payment-message.module#PaymentMessagePageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
