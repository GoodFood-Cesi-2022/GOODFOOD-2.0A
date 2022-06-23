import { Ingredient } from './ingredient.model';
import { Picture } from './picture.model';
import { RecipeType } from './recipe-type.model';

export interface Recipe {
  id?: number;
  name?: string;
  description?: string;
  base_price?: number;
  star?: boolean;
  ingredients?: Ingredient[];
  recipe_type?: RecipeType;
  //created_by: number;
  available_at?: Date;
  pictures?: Picture[];
}
