import { IngreType } from './ingredient-type.model';

/*
 * url : /ingredients
 */
export interface Ingredient {
  id?: number;
  name?: string;
  allergen?: boolean;
  types?: IngreType[];
  // created_at?: Date;
  // updated_at?: Date;
}
