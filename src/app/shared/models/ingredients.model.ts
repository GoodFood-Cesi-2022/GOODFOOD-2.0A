/*
 * url : /ingredients
 */
export interface Ingredients {
  id?: number;
  name?: string;
  allergen?: boolean;
  types?: Types[];
}

/*
 * url : /ingredients/types
 * As fish, meat, vegetable, fruits, ..
 */
export interface Types {
  id?: number;
  name?: string;
  code?: string;
  description?: string;
}
