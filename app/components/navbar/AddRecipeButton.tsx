'use client';

import useLoginModal from "@/app/hooks/useLoginModal";
import useAddRecipeModal from "@/app/hooks/useAddRecipeModal";

interface AddRecipeButtonProps {
    userId?: string | null;
}

const AddRecipeButton: React.FC<AddRecipeButtonProps> = ({
    userId
}) => {
    const loginModal = useLoginModal();
    const addRecipeModal = useAddRecipeModal();

    const handleAddRecipe = () => {
        if (userId) {
            addRecipeModal.open();
        } else {
            loginModal.open();
        }
    };

    return (
        <div 
            onClick={handleAddRecipe}
            className="p-2 lg:p-4 bg-blue-500 hover:bg-blue-600 transition rounded-full text-white cursor-pointer"
        >
            <p className="text-sm font-semibold">Add New Recipe</p>
        </div>
    );
}

export default AddRecipeButton;
