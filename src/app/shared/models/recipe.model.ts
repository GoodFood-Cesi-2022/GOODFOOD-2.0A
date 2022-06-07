import { Ingredients } from './ingredients.model';

export interface Recipe {
  id?: number;
  name?: string;
  base_price?: number;
  description?: string;
  star?: boolean;
  ingredients?: Ingredients[];
  recipe_type?: RecipeType;
  // created_by: number;
  available_at?: Date;
}

export interface RecipeType {
  //id?: number;
  code?: string;
  name?: string;
  description?: string;
}
