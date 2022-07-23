import { Recipe } from '../models/recipe.model';
import { mockIngredientArray } from './ingredients.mock';
import { mockpictureArray } from './picture.mock';
import { recipeType1, recipeType2 } from './recipe-type.mock';

const mockRecipe1: Recipe = {
  id: 1,
  name: 'string',
  star: false,
  base_price: 22,
  description: 'string',
  recipe_type: recipeType1,
  ingredients: mockIngredientArray,
  available_at: new Date('2019-08-24T14:15:22Z'),
  trashed_at: null,
  pictures: mockpictureArray,
};
const mockRecipe2: Recipe = {
  id: 2,
  name: 'string',
  star: true,
  base_price: 10,
  description: 'string',
  recipe_type: recipeType2,
  ingredients: mockIngredientArray,
  available_at: new Date('2019-08-24T14:15:22Z'),
  trashed_at: null,
  pictures: mockpictureArray,
};

const mockRecipeArray: Recipe[] = [mockRecipe1, mockRecipe2];

export { mockRecipe1, mockRecipe2, mockRecipeArray };
