'use client';

import useSearchModal from "@/app/hooks/useSearchModal";
import { FaSearch } from "react-icons/fa";

const SearchFilters = () => {
    const searchModal = useSearchModal();

    return (
        <div 
            onClick={() => searchModal.open('filters')}
            className="h-[48px] lg:h-[64px] flex flex-row items-center justify-between border rounded-full"
        >
            <div className="hidden lg:block">
                <div className="flex flex-row items-center justify-between">
                    <div 
                        className="cursor-pointer w-[250px] h-[48px] lg:h-[64px] px-8 flex flex-col justify-center rounded-full hover:bg-gray-100"
                        onClick={(e) => { e.stopPropagation(); searchModal.open('ingredients'); }}
                    >
                        <p className="text-xs font-semibold">Ingredients</p>
                        <p className="text-sm">Add key ingredients</p>
                    </div>

                    <div 
                        className="cursor-pointer h-[48px] lg:h-[64px] px-8 flex flex-col justify-center rounded-full hover:bg-gray-100"
                        onClick={(e) => { e.stopPropagation(); searchModal.open('cuisine'); }}
                    >
                        <p className="text-xs font-semibold">Cuisine</p>
                        <p className="text-sm">Select cuisine type</p>
                    </div>
                    
                    <div 
                        className="cursor-pointer h-[48px] lg:h-[64px] px-8 flex flex-col justify-center rounded-full hover:bg-gray-100"
                        onClick={(e) => { e.stopPropagation(); searchModal.open('mealType'); }}
                    >
                        <p className="text-xs font-semibold">Meal Type</p>
                        <p className="text-sm">Choose meal type</p>
                    </div>

                    <div 
                        className="cursor-pointer h-[48px] lg:h-[64px] px-8 flex flex-col justify-center rounded-full hover:bg-gray-100"
                        onClick={(e) => { e.stopPropagation(); searchModal.open('difficulty'); }}
                    >
                        <p className="text-xs font-semibold">Difficulty</p>
                        <p className="text-sm">Select difficulty level</p>
                    </div>
                </div>
            </div>

            <div 
                className="cursor-pointer p-2 lg:p-4 transition rounded-full text-white flex items-center justify-center" 
                style={{ backgroundColor: 'red' }}
                onClick={(e) => { e.stopPropagation(); searchModal.open('filters'); }}
            >
                <FaSearch size={16} />
            </div>
        </div>
    )
}

export default SearchFilters;
