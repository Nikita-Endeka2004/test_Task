import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { RecipeDetail } from '../../types/Recipe';
import styles from '../../styles/RecipeDetail.module.css';
import CategorySidebar from '../../components/CategorySidebar';

export default function RecipeDetailPage() {
    const [recipe, setRecipe] = useState<RecipeDetail | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        const fetchRecipeDetail = async () => {
            if (!id) return;

            setLoading(true);
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes/${id}`);
                const data = await response.json();

                if (data.meals && data.meals.length > 0) {
                    setRecipe(data.meals[0]);
                } else {
                    setRecipe(null);
                }
            } catch (error) {
                console.error('Error fetching recipe details:', error);
                setRecipe(null);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipeDetail();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!recipe) {
        return <p>Recipe not found.</p>;
    }

    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}`];
        const measure = recipe[`strMeasure${i}`];

        if (ingredient && ingredient.trim() !== '') {
            ingredients.push({ ingredient, measure });
        }
    }

    return (
        <div className={styles.recipeDetailContainer}>
            <div className={styles.mainContent}>
                <div className={styles.recipeHeader}>
                    <div className={styles.imageContainer}>
                        <img
                            src={recipe.strMealThumb}
                            alt={recipe.strMeal}
                            className={styles.recipeImage}
                        />
                    </div>
                    <div className={styles.recipeInfo}>
                        <h1 className={styles.recipeName}>{recipe.strMeal}</h1>
                        <Link href={`/?country=${recipe.strArea}`}>
                            <a className={styles.recipeCountry}>{recipe.strArea} Cuisine</a>
                        </Link>
                    </div>
                </div>

                <div className={styles.recipeContent}>
                    <div className={styles.instructionsSection}>
                        <h2>Instructions</h2>
                        <p>{recipe.strInstructions}</p>
                    </div>

                    <div className={styles.ingredientsSection}>
                        <h2>Ingredients</h2>
                        <ul className={styles.ingredientsList}>
                            {ingredients.map((item, index) => (
                                <li key={index}>
                                    <Link href={`/?ingredient=${item.ingredient}`}>
                                        <a>{item.measure} {item.ingredient}</a>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className={styles.sidebar}>
                <CategorySidebar category={recipe.strCategory} />
            </div>
        </div>
    );
}