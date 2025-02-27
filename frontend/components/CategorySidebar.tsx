import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Recipe } from '../types/Recipe';
import styles from '../styles/CategorySidebar.module.css';

interface CategorySidebarProps {
    category: string;
}

const CategorySidebar = ({ category }: CategorySidebarProps) => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchCategoryRecipes = async () => {
            if (!category) return;

            setLoading(true);
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/recipes?category=${category}`
                );
                const data = await response.json();

                if (data.meals) {
                    setRecipes(data.meals);
                } else {
                    setRecipes([]);
                }
            } catch (error) {
                console.error('Error fetching category recipes:', error);
                setRecipes([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCategoryRecipes();
    }, [category]);

    if (loading) {
        return <p>Loading category recipes...</p>;
    }

    return (
        <div className={styles.sidebarContainer}>
            <h2>More {category} Recipes</h2>
            <div className={styles.categoriesList}>
                {recipes.map((recipe) => (
                    <Link href={`/recipe/${recipe.idMeal}`} key={recipe.idMeal}>
                        <a className={styles.categoryItem}>
                            <img
                                src={recipe.strMealThumb}
                                alt={recipe.strMeal}
                                className={styles.categoryImage}
                            />
                            <p>{recipe.strMeal}</p>
                        </a>
                    </Link>
                ))}
            </div>
            <div className={styles.viewAllContainer}>
                <Link href={`/?category=${category}`}>
                    <a className={styles.viewAllLink}>View all {category} recipes</a>
                </Link>
            </div>
        </div>
    );
};

export default CategorySidebar;