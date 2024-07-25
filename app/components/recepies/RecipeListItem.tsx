'use client';

import Image from "next/image";
import { RecipeType } from "./RecipeList";
import { useRouter } from "next/navigation";
import FavoriteButton from "../FavoriteButton";

interface RecipeProps {
    recipe: RecipeType;
    markFavorite?: (is_favorite: boolean) => void;
}

const RecipeListItem: React.FC<RecipeProps> = ({
    recipe,
    markFavorite
}) => {
    const router = useRouter();

    return (
        <div 
            className="cursor-pointer"
            onClick={() => router.push(`/recipes/${recipe.id}`)}
        >
            <div className="relative overflow-hidden aspect-square rounded-xl">
                <Image
                    fill
                    src={recipe.image_url || '/logo.png'} // Ensuring there's a fallback image
                    sizes="(max-width: 768px) 768px, (max-width: 1200px): 768px, 768px"
                    className="hover:scale-110 object-cover transition h-full w-full"
                    alt={recipe.title}
                />

                {markFavorite && (
                    <FavoriteButton
                        id={recipe.id}
                        is_favorite={recipe.is_favorite}
                        markFavorite={(is_favorite: boolean) => markFavorite(is_favorite)}
                    /> 
                )}
            </div>

            <div className="mt-2">
                <p className="text-lg font-bold">{recipe.title}</p>
            </div>

            <div className="mt-2">
                <p className="text-sm text-gray-500"><strong>Category: {recipe.category}</strong></p>
            </div>

            <div className="mt-2">
                <p className="text-sm text-gray-500">Servings: {recipe.servings}</p>
            </div>
        </div>
    )
}

export default RecipeListItem;
