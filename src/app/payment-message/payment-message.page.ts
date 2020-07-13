import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-message',
  templateUrl: './payment-message.page.html',
  styleUrls: ['./payment-message.page.scss'],
})
export class PaymentMessagePage implements OnInit {

  constructor() { }

  message;
  id;
  ngOnInit() {
  }

}
