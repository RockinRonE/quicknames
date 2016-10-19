import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the ItemPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-item-page',
  templateUrl: 'item-page.html'
})
export class ItemPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello ItemPage Page');
  }

}
