import { Request, Response } from "express";
import { recipeService } from "@/services"
import httpStatus from "http-status";
import { errorHandlerWrapper } from "@/utils";

const getAllRecipesHandler = async (req: Request, res: Response) => {
  const recipes = await recipeService.getAllRecipes();
  const totalCount = await recipeService.getRecipeCount();
  res.status(httpStatus.OK).json({ totalCount, recipes });
};

const getRecipeHandler = async (req: Request, res: Response) => {
  const recipeUuid = req.params.id;
  const recipe = await recipeService.getRecipe(recipeUuid);
  res.status(httpStatus.OK).json({ recipe });
};

const createRecipeHandler = async (req: Request, res: Response) => {
  const { title, instruction, ingredients } = req.body;
  const recipe = await recipeService.createRecipe({
    title,
    instruction,
    ingredients,
  });
  res.status(httpStatus.CREATED).json({ recipe });
};

const updateRecipeHandler = async (req: Request, res: Response) => {
  const recipe = await recipeService.updateRecipe(req.params.id, req.body);
  res.status(httpStatus.OK).json({ recipe });
};

const deleteRecipeHandler = async (req: Request, res: Response) => {
  await recipeService.deleteRecipe(req.params.id);
  res.status(httpStatus.OK).json({});
};

export const getAllRecipes = errorHandlerWrapper(getAllRecipesHandler);
export const createRecipe = errorHandlerWrapper(createRecipeHandler);
export const getRecipe = errorHandlerWrapper(getRecipeHandler);
export const updateRecipe = errorHandlerWrapper(updateRecipeHandler);
export const deleteRecipe = errorHandlerWrapper(deleteRecipeHandler);
