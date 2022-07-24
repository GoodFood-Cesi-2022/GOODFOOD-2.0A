import { Component, OnInit } from "@angular/core";
import { LoadingService } from "src/app/shared/services/loading/loading.service";
import { UsersService } from "src/app/shared/services/users/users.service";
import { finalize } from "rxjs/operators";
import { FranchiseeService } from "src/app/shared/services/franchisee/franchisee.service";
import { RecipeService } from "src/app/shared/services/recipe/recipe.service";
import { IngredientService } from "src/app/shared/services/ingredient/ingredient.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  userNumber: number;
  franchiseeNumber: number;
  recipeNumber: number;
  ingredientNumber: number;

  constructor(
    private usersService: UsersService,
    private loading: LoadingService,
    private franchiseeService: FranchiseeService,
    private recipeService: RecipeService,
    private ingredientService: IngredientService
  ) {
    //NOSONAR
  }

  ngOnInit(): void {
    this.userNumber = 0;
    this.franchiseeNumber = 0;
    this.recipeNumber = 0;
    this.ingredientNumber = 0;
    this.loading.loadingOn();

    this.usersService.getUsers().subscribe((res) => {
      this.userNumber = res.length;
    });

    this.franchiseeService.getFranchisees().subscribe((res): void => {
      this.franchiseeNumber = res.length;
    });

    this.recipeService.getRecipes().subscribe((res): void => {
      this.recipeNumber = res.length;
    });

    this.ingredientService
      .getIngredients()
      .pipe(finalize((): void => this.loading.loadingOff()))
      .subscribe((res) => {
        this.ingredientNumber = res.length;
      });
  }
}
