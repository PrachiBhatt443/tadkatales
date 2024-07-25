'use client';

import Modal from "./Modal";
import { useState } from "react";
import useSearchModal, { SearchQuery } from "@/app/hooks/useSearchModal";
import CustomButton from "../forms/CustomButton";

const SearchModal = () => {
    const searchModal = useSearchModal();
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [cuisine, setCuisine] = useState<string>('');
    const [mealType, setMealType] = useState<string>('');
    const [difficulty, setDifficulty] = useState<string>('');
    const [category, setCategory] = useState<string>('');

    const closeAndSearch = () => {
        const newSearchQuery: SearchQuery = {
            ingredients: ingredients,
            cuisine: cuisine,
            mealType: mealType,
            difficulty: difficulty,
            category: category,
        }

        searchModal.setQuery(newSearchQuery);
        searchModal.close();
    }

    let content = (<></>);

    const contentIngredients = (
        <>
            <h2 className="mb-6 text-2xl">Add Key Ingredients</h2>
            <input 
                type="text" 
                value={ingredients.join(', ')} 
                onChange={(e) => setIngredients(e.target.value.split(',').map(item => item.trim()))} 
                className="w-full h-14 px-4 border border-gray-300 rounded-xl"
            />
            <div className="mt-6 flex flex-row gap-4">
                <CustomButton
                    label="Cuisine ->"
                    onClick={() => searchModal.open('cuisine')}
                />
            </div>
        </>
    );

    const contentCuisine = (
        <>
            <h2 className="mb-6 text-2xl">Select Cuisine Type</h2>
            <input 
                type="text" 
                value={cuisine} 
                onChange={(e) => setCuisine(e.target.value)} 
                className="w-full h-14 px-4 border border-gray-300 rounded-xl"
            />
            <div className="mt-6 flex flex-row gap-4">
                <CustomButton
                    label="<- Ingredients"
                    onClick={() => searchModal.open('ingredients')}
                />
                <CustomButton
                    label="Meal Type ->"
                    onClick={() => searchModal.open('mealType')}
                />
            </div>
        </>
    );

    const contentMealType = (
        <>
            <h2 className="mb-6 text-2xl">Choose Meal Type</h2>
            <input 
                type="text" 
                value={mealType} 
                onChange={(e) => setMealType(e.target.value)} 
                className="w-full h-14 px-4 border border-gray-300 rounded-xl"
            />
            <div className="mt-6 flex flex-row gap-4">
                <CustomButton
                    label="<- Cuisine"
                    onClick={() => searchModal.open('cuisine')}
                />
                <CustomButton
                    label="Difficulty ->"
                    onClick={() => searchModal.open('difficulty')}
                />
            </div>
        </>
    );

    const contentDifficulty = (
        <>
            <h2 className="mb-6 text-2xl">Select Difficulty Level</h2>
            <input 
                type="text" 
                value={difficulty} 
                onChange={(e) => setDifficulty(e.target.value)} 
                className="w-full h-14 px-4 border border-gray-300 rounded-xl"
            />
            <div className="mt-6 flex flex-row gap-4">
                <CustomButton
                    label="<- Meal Type"
                    onClick={() => searchModal.open('mealType')}
                />
                <CustomButton
                    label="Search"
                    onClick={closeAndSearch}
                />
            </div>
        </>
    );

    if (searchModal.step === 'ingredients') {
        content = contentIngredients;
    } else if (searchModal.step === 'cuisine') {
        content = contentCuisine;
    } else if (searchModal.step === 'mealType') {
        content = contentMealType;
    } else if (searchModal.step === 'difficulty') {
        content = contentDifficulty;
    }

    return (
        <Modal
            label="Search"
            content={content}
            close={searchModal.close}
            isOpen={searchModal.isOpen}
        />
    );
}

export default SearchModal;
