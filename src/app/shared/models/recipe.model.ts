import { Ingredient } from './ingredient.model';
import { Picture } from './picture.model';
import { RecipeType } from './recipe-type.model';

export interface Recipe {
  id?: number;
  name?: string;
  star?: boolean;
  base_price?: number;
  description?: string;
  recipe_type?: RecipeType;
  ingredients?: Ingredient[];
  //created_by: number;
  available_at?: Date;
  trashed_at?: Date;
  pictures?: Picture[];
}
