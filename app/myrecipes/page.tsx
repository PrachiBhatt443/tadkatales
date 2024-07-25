
import { getUserId } from "../lib/actions";
 // Assuming you have a RecipeList component
import RecipeList from "../components/recepies/RecipeList";

const MyRecipesPage = async () => {
    const userId = await getUserId();

    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6">
            <h1 className="my-6 text-2xl">My Recipes</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <RecipeList 
                    chef_id={userId}
                />
            </div>
        </main>
    )
}

export default MyRecipesPage;
