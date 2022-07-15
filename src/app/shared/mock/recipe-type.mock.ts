import { RecipeType } from '../models/recipe-type.model';

const recipeType1: RecipeType = {
  id: 1,
  code: 'string',
  name: 'string',
  description: 'string',
};
const recipeType2: RecipeType = {
  id: 2,
  code: 'string',
  name: 'string',
  description: 'string',
};
const recipeType3: RecipeType = {
  id: 3,
  code: 'string',
  name: 'string',
  description: 'string',
};

const mockRecipeTypeArray: RecipeType[] = [
  recipeType2,
  recipeType2,
  recipeType3,
];

export { recipeType1, recipeType2, recipeType3, mockRecipeTypeArray };
