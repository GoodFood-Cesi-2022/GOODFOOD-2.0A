import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { Recipe } from './recipe';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
  styles: [
    `
      :host ::ng-deep .p-dialog .product-image {
        width: 150px;
        margin: 0 auto 2rem auto;
        display: block;
      }
    `,
  ],
})
export class RecipeComponent implements OnInit {
  products: Recipe[];
  recipe: Recipe;

  sortOptions: SelectItem[];
  sortOrder: number;
  sortField: string;
  sortKey: string;

  submitted: boolean;
  recipeDialog: boolean;

  constructor(
    private productService: RecipeService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.productService.getProducts().then((data) => (this.products = data));

    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' },
    ];
  }

  openNew() {
    this.recipe = {};
    this.submitted = false;
    this.recipeDialog = true;
  }

  onSortChange(event) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }
  saveUser() {
    this.submitted = true;

    if (this.recipe.code.trim()) {
      if (this.recipe.id) {
        this.products[this.findIndexById(this.recipe.id)] = this.recipe;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'User Updated',
          life: 3000,
        });
      } else {
        this.recipe.id = this.createId();
        this.products.push(this.recipe);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'User Created',
          life: 3000,
        });
      }

      this.products = [...this.products];
      this.recipeDialog = false;
      this.recipe = {};
    }
  }
  deleteUser(user: Recipe) {
    this.confirmationService.confirm({
      message:
        'Vous êtes sûr de vouloir supprimer ' +
        ' "' +
        user.name +
        ' ' +
        user.code +
        '" ' +
        '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter((val) => val.id !== user.id);
        this.recipe = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'User Deleted',
          life: 3000,
        });
      },
    });
  }

  hideDialog() {
    this.recipeDialog = false;
    this.submitted = false;
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  createId(): number {
    return Math.floor(Math.random() * Math.floor(299) + 1);
  }
}
