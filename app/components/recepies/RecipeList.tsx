'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import RecipeListItem from "./RecipeListItem";
import apiService from '@/app/services/apiService';
import useSearchModal from '@/app/hooks/useSearchModal';

export type RecipeType = {
    id: string;
    title: string;
    image_url: string;
    cuisine: string;
    difficulty: string;
    is_favorite: boolean;
    category: string;
    servings: number;
}

interface RecipeListProps {
    chef_id?: string | null;
    favorites?: boolean | null;
}

const RecipeList: React.FC<RecipeListProps> = ({
    chef_id,
    favorites
}) => {
    const params = useSearchParams();
    const searchModal = useSearchModal();
    const ingredients = searchModal.query.ingredients;
    const cuisine = searchModal.query.cuisine;
    const mealType = searchModal.query.mealType;
    const difficulty = searchModal.query.difficulty;
    const category = searchModal.query.category;
    const [recipes, setRecipes] = useState<RecipeType[]>([]);
    console.log('searchQuery:', searchModal.query);
    
    const markFavorite = (id: string, is_favorite: boolean) => {
        const tmpRecipes = recipes.map((recipe: RecipeType) => {
            if (recipe.id == id) {
                recipe.is_favorite = is_favorite;
                if (is_favorite) {
                    console.log('added to list of favorited recipes');
                } else {
                    console.log('removed from list');
                }
            }
            return recipe;
        });
        setRecipes(tmpRecipes);
    }

    const getRecipes = async () => {
        let url = '/api/recipes/';

        if (chef_id) {
            url += `?author_id=${chef_id}`;
        } 
        else if (favorites) {
            url += '?is_favorites=true';
        } 
        else {
            let urlQuery = '';

            if (ingredients.length) {
                urlQuery += '&ingredients=' + ingredients.join(',');
            }

            if (cuisine) {
                urlQuery += '&cuisine=' + cuisine;
            }

            if (mealType) {
                urlQuery += '&mealType=' + mealType;
            }

            if (difficulty) {
                urlQuery += '&difficulty=' + difficulty;
            }

            if (category) {
                urlQuery += '&category=' + category;
            }

            if (urlQuery.length) {
                console.log('Query:', urlQuery);

                urlQuery = '?' + urlQuery.substring(1);

                url += urlQuery;
            }
        }

        const tmpRecipes = await apiService.get(url);
        const tmpFavorites = tmpRecipes.favorites || []; // Renamed variable to tmpFavorites to avoid conflicts

        setRecipes(tmpRecipes.data.map((recipe: RecipeType) => {
            if(tmpFavorites.includes(recipe.id)){
                recipe.is_favorite = true;
            } else {
                recipe.is_favorite = false;
            }
            return recipe;
        }));
    };

    useEffect(() => {
        getRecipes();
    }, [category, searchModal.query, params]);

    return (
        <>
            {recipes.map((recipe) => {
                return (
                    <RecipeListItem 
                        key={recipe.id}
                        recipe={recipe}
                        markFavorite={(is_favorite: any) => markFavorite(recipe.id, is_favorite)}
                    />
                )
            })}
        </>
    )
}

export default RecipeList;
