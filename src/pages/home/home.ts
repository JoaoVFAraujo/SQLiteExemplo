import { Product } from './../../providers/product/product';
import { Component } from '@angular/core';

import { SQLite, SQLiteObject, SQLiteDatabaseConfig } from '@ionic-native/sqlite';
import { NavController, ToastController } from 'ionic-angular';
import { ProductProvider } from '../../providers/product/product';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  products: any[] = [];
  onlyInactives: boolean = false;
  searchText: string = null;

  constructor(
    public navCtrl: NavController,
    private toast: ToastController,
    private productProvider: ProductProvider) {

  }

  ionViewDidEnter(){
    this.getAllProducts()
  }

  getAllProducts() {
    this.productProvider.getAll(!this.onlyInactives, this.searchText)
      .then((result: any[]) => {
        this.products = result
      })
  }

  addProduct() {
    this.navCtrl.push('EditProductPage');
  }

  editProduct(id: number) {
    this.navCtrl.push('EditProductPage', { id: id });
  }

  removeProduct(product: Product) {
    this.productProvider.remove(product.id)
      .then(() => {
        // Removendo do array de produtos
        var index = this.products.indexOf(product);

        this.products.slice(index, 1);
        this.toastPresent('Produto removido')
      })
  }

  toastPresent(message: string, duration?: number, position?: string) {
    this.toast.create({
      message: message,
      duration: duration ? duration : 3000,
      position: position ? position : 'botton'
     }).present()
  }

  filterProducts(ev: any) {
    this.getAllProducts();
  }

}
