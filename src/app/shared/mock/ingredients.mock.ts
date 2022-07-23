import { Ingredient } from '../models/ingredient.model';
import { mockType1, mockType2 } from './ingredient-type.mock';

const mockIngre1: Ingredient = {
  id: 1,
  name: 'Porc',
  allergen: false,
  types: [mockType2],
};
const mockIngre2: Ingredient = {
  id: 2,
  name: 'Saumon',
  allergen: true,
  types: [mockType1],
};

const mockIngredientArray: Ingredient[] = [mockIngre1, mockIngre2];

export { mockIngre1, mockIngre2, mockIngredientArray };
