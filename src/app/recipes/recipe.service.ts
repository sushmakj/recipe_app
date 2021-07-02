import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";
@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe(
      "A Test Recipe",
      "This is a dummy test recipe",
      "data:image/jpeg;base64,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",
      [new Ingredient("Pizza Sause", 1), new Ingredient("Cheese", 4)]
    ),
    new Recipe(
      "Delicious Burger",
      "Make your own Burger",
      "data:image/jpeg;base64,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",
      [new Ingredient("Buns", 2), new Ingredient("Onion", 2)]
    ),
  ];
  constructor(private slService:ShoppingListService){}
  getRecipes() {
    return this.recipes.slice();
  }
  addIngredientsToShoppingList(ingredient:Ingredient[]){
    this.slService.addIngredients(ingredient);
  }
}
