import { Request, Response } from 'express';
import axios from 'axios';

const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const getRecipes = async (req: Request, res: Response) => {
    try {
        const { ingredient, country, category } = req.query;
        let endpoint = `${API_BASE_URL}/search.php?s=`;

        if (ingredient) {
            endpoint = `${API_BASE_URL}/filter.php?i=${ingredient}`;
        } else if (country) {
            endpoint = `${API_BASE_URL}/filter.php?a=${country}`;
        } else if (category) {
            endpoint = `${API_BASE_URL}/filter.php?c=${category}`;
        }

        const response = await axios.get(endpoint);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).json({ message: 'Error fetching recipes' });
    }
};

export const getRecipeById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const endpoint = `${API_BASE_URL}/lookup.php?i=${id}`;

        const response = await axios.get(endpoint);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching recipe details:', error);
        res.status(500).json({ message: 'Error fetching recipe details' });
    }
};