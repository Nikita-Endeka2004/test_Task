export interface Recipe {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    [key: string]: any;
}

export interface RecipeDetail {
    idMeal: string;
    strMeal: string;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    strMealThumb: string;
    strTags?: string;
    strYoutube?: string;
    [key: string]: any;
}