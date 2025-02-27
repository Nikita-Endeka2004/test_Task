import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import RecipeList from '../components/RecipeList';
import { Recipe } from '../types/Recipe';
import styles from '../styles/Home.module.css';

export default function Home() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [title, setTitle] = useState<string>('All Recipes');
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();
    const { ingredient, country, category } = router.query;

    useEffect(() => {
        const fetchRecipes = async () => {
            setLoading(true);
            try {
                let url = `${process.env.NEXT_PUBLIC_API_URL}/recipes`;

                if (ingredient) {
                    url += `?ingredient=${ingredient}`;
                    setTitle(`Recipes with ${ingredient}`);
                } else if (country) {
                    url += `?country=${country}`;
                    setTitle(`${country} Recipes`);
                } else if (category) {
                    url += `?category=${category}`;
                    setTitle(`${category} Recipes`);
                } else {
                    setTitle('All Recipes');
                }

                const response = await fetch(url);
                const data = await response.json();

                if (data.meals) {
                    setRecipes(data.meals);
                } else {
                    setRecipes([]);
                }
            } catch (error) {
                console.error('Error fetching recipes:', error);
                setRecipes([]);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, [ingredient, country, category]);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{title}</h1>
            {loading ? (
                <p>Loading...</p>
            ) : recipes.length > 0 ? (
                <RecipeList recipes={recipes} />
            ) : (
                <p>No recipes found.</p>
            )}
        </div>
    );
}