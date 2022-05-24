import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { Product } from 'src/app/shared/models/products.model';
//import { ProductService } from 'src/app/shared/services/product/product-service.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  styles: [
    `
      :host ::ng-deep .p-button {
        margin: 0 0.5rem 0 0;
        min-width: 10rem;
      }

      p {
        margin: 0;
      }

      .confirmation-content {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      :host ::ng-deep .p-dialog .p-button {
        min-width: 6rem;
      }
    `,
  ],
})
export class RecipesComponent implements OnInit {
  stateOptions: any[];

  paymentOptions!: any[];

  justifyOptions: any[];

  value1: string = 'Tout';

  value2: string = 'Disponible';

  value3: string = 'Rupture';

  displayModal!: boolean;

  products!: Product[];

  sortOptions!: SelectItem[];

  sortOrder!: number;

  sortField!: string;

  constructor(
    //private productService: ProductService,
    private primengConfig: PrimeNGConfig
  ) {
    this.stateOptions = [
      { label: 'Tout', value: 'Tout' },
      { label: 'Disponible', value: 'Disponible' },
      { label: 'Rupture', value: 'Rupture' },
    ];

    this.justifyOptions = [
      { icon: 'pi pi-align-left', justify: 'Left' },
      { icon: 'pi pi-align-right', justify: 'Right' },
      { icon: 'pi pi-align-center', justify: 'Center' },
      { icon: 'pi pi-align-justify', justify: 'Justify' },
    ];
  }

  ngOnInit() {
    //this.productService.getProducts().then((data) => (this.products = data));

    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' },
    ];

    this.primengConfig.ripple = true;
  }

  onSortChange(event: any) {
    // let element = event.target as HTMLTextAreaElement;
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  showModalDialog() {
    this.displayModal = true;
  }
}
