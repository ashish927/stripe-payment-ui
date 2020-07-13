import { Component } from '@angular/core';
declare var Stripe;
import { HttpClient } from "@angular/common/http";
import { ModalController } from '@ionic/angular';
import { StripeAuthPage } from '../stripe-auth/stripe-auth.page';
import { PaymentMessagePage } from '../payment-message/payment-message.page';

@Component({
  selector: 'app-stripe',
  templateUrl: 'stripe.page.html',
  styleUrls: ['stripe.page.scss'],
})
export class StripePage {
  isenabled: boolean = true;
  card: any;

  dataReturned: any
  constructor(private http: HttpClient, public modalController: ModalController) {
  }

  ngOnInit() {
    this.setupStripe();
    this.isenabled = true
  }

  setupStripe() {
    var handleCardAction;
    var orderComplete;
    var showError;
    var changeLoadingState;
    var that = this;
    var stripe = Stripe('pk_test_51GvfyGA0OHere0JfgbztYnSAO8KQyf8K4LkzMcDYCaCcCyeqXLGi0fgKwIevV1Nkbz2X42dcMdbqL9WxQpDhtTT800pzN6Rukh');

    let elements = stripe.elements();
    var style = {
      base: {
        color: '#32325d',
        lineHeight: '24px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };

    var card = elements.create('card', { style: style });
    console.log(card);
    card.mount('#card-element');

    card.addEventListener('change', event => {
      var displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });


    var cardButton = document.getElementById('card-button');
    var resultContainer = document.getElementById('card-result');

    cardButton.addEventListener('click', function (ev) {

      stripe.createPaymentMethod({
        type: 'card',
        card: card,
        billing_details: {
          name: "Ashish Rathore",
        },
      }
      ).then(function (result) {
        if (result.error) {
          resultContainer.textContent = result.error.message;
        } else {
          that.chargeCustomer(result)
        }
      });
    });

  }

  chargeCustomer(result) {
    this.http
      .post('http://localhost:9010/payment/charge', {
        paymentMethodId: result.paymentMethod.id,
        orderId: "new-order"
      }).subscribe((response: any) => {
        console.log(response);

        if (response.actionRequired) {
          // Request authentication
          this.handleAction(response.clientSecret);
        } else {
          this.orderComplete(response.clientSecret);
        }
      });
  }


  handleAction = (clientSceret) => {
    this.isenabled = false
    let stripe = Stripe('pk_test_51GvfyGA0OHere0JfgbztYnSAO8KQyf8K4LkzMcDYCaCcCyeqXLGi0fgKwIevV1Nkbz2X42dcMdbqL9WxQpDhtTT800pzN6Rukh');
    stripe.handleCardAction(clientSceret).then((data) => {
      if (data.error) {
        this.showError("Your card was not authenticated, please try again");
      } else if (data.paymentIntent.status === "requires_confirmation") {
        console.log(data)
        this.http.post('http://localhost:9010/payment/charge', {
          paymentIntentId: data.paymentIntent.id,
          orderId: "new-order"
        }).subscribe((response: any) => {
          this.orderComplete(clientSceret);
        });

      }
    });
  };


  orderComplete = (clientScerete) => {
    var that = this;
    var stripe = Stripe('pk_test_51GvfyGA0OHere0JfgbztYnSAO8KQyf8K4LkzMcDYCaCcCyeqXLGi0fgKwIevV1Nkbz2X42dcMdbqL9WxQpDhtTT800pzN6Rukh');
    stripe.retrievePaymentIntent(clientScerete).then(function (result) {
      var paymentIntent = result.paymentIntent;
      var paymentIntentJson = JSON.stringify(paymentIntent, null, 2);
      // Code for print payment intent object

      // document.querySelector(".sr-payment-form").classList.add("hidden");
      // document.querySelector("pre").textContent = paymentIntentJson;

      // document.querySelector(".sr-result").classList.remove("hidden");
      // setTimeout(() => {
      //   document.querySelector(".sr-result").classList.add("expand");
      // }, 200);

      that.openModal(paymentIntent);
    });
  };



  showError = function (errorMsgText) {
    this.changeLoadingState(false);
    var errorMsg = document.querySelector(".card-errors");
    errorMsg.textContent = errorMsgText;
    this.isenabled = true;
    setTimeout(function () {
      errorMsg.textContent = "";
    }, 4000);
  };


  changeLoadingState = function (isLoading) {
    if (isLoading) {
      document.querySelector("button").disabled = true;
      document.querySelector("#spinner").classList.remove("hidden");
      document.querySelector("#button-text").classList.add("hidden");
    } else {
      document.querySelector("#spinner").classList.add("hidden");
      document.querySelector("#button-text").classList.remove("hidden");
      this.i
    }
  };





  async openModal(paymentIntent) {
    const modal = await this.modalController.create({
      component: PaymentMessagePage,
      componentProps: {
        "id": paymentIntent.id,
        "message": paymentIntent.status
      },
      cssClass: 'my-custom-modal-css'
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        this.ngOnInit()
      }
    });

    return await modal.present();
  }




}
