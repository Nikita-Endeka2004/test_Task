import Link from 'next/link';
import { Recipe } from '../types/Recipe';
import styles from '../styles/RecipeList.module.css';

interface RecipeListProps {
    recipes: Recipe[];
}

const RecipeList = ({ recipes }: RecipeListProps) => {
    return (
        <div className={styles.recipeGrid}>
            {recipes.map((recipe) => (
                <Link href={`/recipe/${recipe.idMeal}`} key={recipe.idMeal}>
                    <a className={styles.recipeCard}>
                        <img
                            src={recipe.strMealThumb}
                            alt={recipe.strMeal}
                            className={styles.recipeImage}
                        />
                        <h2 className={styles.recipeName}>{recipe.strMeal}</h2>
                    </a>
                </Link>
            ))}
        </div>
    );
};

export default RecipeList;