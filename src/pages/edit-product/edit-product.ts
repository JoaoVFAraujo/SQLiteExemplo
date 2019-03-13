import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Product, ProductProvider } from '../../providers/product/product';
import { CategoryProvider } from '../../providers/category/category';

@IonicPage()
@Component({
  selector: 'page-edit-product',
  templateUrl: 'edit-product.html',
})
export class EditProductPage {
  model: Product
  categories: any[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toast: ToastController,
    private productProvider: ProductProvider,
    private categoryProvider: CategoryProvider) {

      this.model = new Product();

      if (this.navParams.data.id) {
        this.productProvider.get(this.navParams.data.id)
          .then((result: any) => {
            this.model = result;
          })
      }
  }

  ionViewDidLoad() {
    this.categoryProvider.getAll()
      .then((result: any[]) => {
        this.categories = result;
      })
      .catch(() => {
        this.toastPresent('Erro ao carregar as catergorias.')
      })
  }

  save() {
    this.saveProduct()
      .then(() => {
        this.toastPresent('Produto salvo.')
        this.navCtrl.pop();
      })
      .catch(() => {
        this.toastPresent('Erro ao salvar o produto.')
      })
  }

  private saveProduct() {
    if (this.model.id) {
      return this.productProvider.update(this.model);
    } else {
      return this.productProvider.insert(this.model);
    }
  }

  toastPresent(message: string, duration?: number, position?: string) {
    this.toast.create({
      message: message,
      duration: duration ? duration : 3000,
      position: position ? position : 'botton'
    }).present()
  }

}
