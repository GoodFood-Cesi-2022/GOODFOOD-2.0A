import { FranchiseeRecipe } from '../models/franchisee-recipe.model';
import { Recipe } from '../models/recipe.model';
import { mockRecipe1, mockRecipe2 } from './recipe.mock';

const mockFranchiseeRecipe1: FranchiseeRecipe = {
  id: 1,
  price: 12.0,
  recipe_id: 1,
  recipe: mockRecipe1,
};
const mockFranchiseeRecipe2: FranchiseeRecipe = {
  id: 2,
  price: 15.0,
  recipe_id: 2,
  recipe: mockRecipe2,
};

const mockFranchiseeRecipeArray: Recipe[] = [
  mockFranchiseeRecipe1,
  mockFranchiseeRecipe2,
];

export {
  mockFranchiseeRecipe1,
  mockFranchiseeRecipe2,
  mockFranchiseeRecipeArray,
};
