/*
 * url : /ingredients
 */
export interface Ingredient {
  id?: number;
  name?: string;
  allergen?: boolean;
  types?: IngreType[];
}

/*
 * url : /ingredients/types
 * As fish, meat, vegetable, fruits, ..
 */
export interface IngreType {
  id?: number;
  name?: string;
  code?: string;
  description?: string;
}
