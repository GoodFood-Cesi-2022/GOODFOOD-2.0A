import { Recipe } from './recipe.model';

export interface FranchiseeRecipe {
	id?: number;
	price?: number;
	recipe_id?: number;
	recipe?: Recipe;
}
