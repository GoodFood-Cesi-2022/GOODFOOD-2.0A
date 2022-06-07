import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from './recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  status: string[] = ['OUTOFSTOCK', 'INSTOCK', 'LOWSTOCK'];

  productNames: string[] = ['Bamboo Watch', 'Black Watch', 'Blue Band'];

  recipeDescription: string[] = [
    'Recette Description - 1',
    'Recette Description - 2',
    'Recette Description - 3',
  ];
  recipeIngredients: string[] = [
    'Recette Description - 1',
    'Recette Description - 2',
    'Recette Description - 3',
  ];

  constructor(private http: HttpClient) {}

  getProductsSmall() {
    return this.http
      .get<any>('assets/products-small.json')
      .toPromise()
      .then((res) => <Recipe[]>res.data)
      .then((data) => {
        return data;
      });
  }

  getProducts() {
    return this.http
      .get<any>('assets/recipes.json')
      .toPromise()
      .then((res) => <Recipe[]>res.data)
      .then((data) => {
        return data;
      });
  }

  getProductsWithOrdersSmall() {
    return this.http
      .get<any>('assets/products-orders-small.json')
      .toPromise()
      .then((res) => <Recipe[]>res.data)
      .then((data) => {
        return data;
      });
  }

  generatePrduct(): Recipe {
    const product: Recipe = {
      id: this.generateId(),
      name: this.generateName(),
      description: this.generateDescription(),
      ingredients: this.generateIngredients(),
      price: this.generatePrice(),
      star: this.generateFavorite(),
      quantity: this.generateQuantity(),
      category: 'Product Category',
    };

    product.image =
      product.name.toLocaleLowerCase().split(/[ ,]+/).join('-') + '.jpg';
    return product;
  }

  generateId() {
    return Math.floor(Math.random() * Math.floor(299) + 1);
  }
  generateName() {
    return this.productNames[Math.floor(Math.random() * Math.floor(30))];
  }
  generateDescription() {
    return this.recipeDescription[Math.floor(Math.random() * Math.floor(1000))];
  }

  generateIngredients() {
    return this.recipeIngredients[Math.floor(Math.random() * Math.floor(1000))];
  }
  generatePrice() {
    return Math.floor(Math.random() * Math.floor(299) + 1);
  }
  generateFavorite() {
    return Math.random() < 0.5;
  }

  generateQuantity() {
    return Math.floor(Math.random() * Math.floor(75) + 1);
  }

  generateStatus() {
    return this.status[Math.floor(Math.random() * Math.floor(3))];
  }
}
