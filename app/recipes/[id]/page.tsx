import Image from "next/image";
import Link from "next/link";
import apiService from "@/app/services/apiService";
import { getUserId } from "@/app/lib/actions";

const RecipeDetailPage = async ({ params }: { params: { id: string } }) => {
    try {
        const recipe = await apiService.get(`/api/recipes/${params.id}`);
        const userId = await getUserId();

        if (!recipe) {
            return <p>Recipe not found</p>;
        }

        return (
            <main className="max-w-[1500px] mx-auto px-6 pb-6">
                <div className="w-full h-[64vh] mb-4 overflow-hidden rounded-xl relative">
                    <Image
                        fill
                        src={recipe.image_url}
                        className="object-cover w-full h-full"
                        alt={recipe.title}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div className="py-6 pr-6 col-span-3">
                        <h1 className="mb-4 text-4xl">{recipe.title}</h1>

                        <span className="mb-6 block text-lg text-gray-600">
                            {recipe.cuisine} - {recipe.mealType} - {recipe.difficulty}
                        </span>

                        <hr />

                        <Link 
                            href={`/chefs/${recipe.author.id}`}
                            className="py-6 flex items-center space-x-4"
                        >
                            {recipe.author.avatar_url && (
                                <Image
                                    src={recipe.author.avatar_url}
                                    width={50}
                                    height={50}
                                    className="rounded-full"
                                    alt={`${recipe.author.name}`}
                                />
                            )}

                            <p><strong>{recipe.author.name}</strong> is your author</p>
                        </Link>

                        <hr />

                        <p className="mt-6 text-lg">
                            {recipe.description}
                        </p>

                        <h2 className="mt-6 text-2xl">Ingredients</h2>
                        <ul className="list-disc ml-6 mt-2">
                            {recipe.ingredients?.map((ingredient: string, index: number) => (
                                <li key={index} className="text-lg text-gray-800">{ingredient}</li>
                            ))}
                        </ul>

                        <h2 className="mt-6 text-2xl">Instructions</h2>
                        <p className="mt-2 text-lg text-gray-800">{recipe.instructions}</p>
                    </div>

                    {/* <ReservationSidebar 
                        property={recipe}
                        userId={userId}
                    /> */}
                </div>
            </main>
        );
    } catch (error) {
        console.error('Error fetching recipe:', error);
        return <p>Error loading recipe</p>;
    }
};

export default RecipeDetailPage;
