import { Ingredient } from './ingredient.model';

export interface Recipe {
  id?: number;
  name?: string;
  description?: string;
  base_price?: number;
  star?: boolean;
  ingredients?: Ingredient[];
  recipe_type?: RecipeType;
  created_by: number;
  available_at?: Date;
}

export interface RecipeType {
  id?: number;
  code?: string;
  name?: string;
  description?: string;
}
