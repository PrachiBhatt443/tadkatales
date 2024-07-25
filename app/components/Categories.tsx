'use client';

import { useState } from 'react';
import { FaCarrot, FaPizzaSlice, FaHamburger, FaLeaf, FaFish } from 'react-icons/fa';
// import useSearchModal, { SearchQuery } from '../hooks/useSearchModal';

const Categories = () => {
    // const searchModal = useSearchModal();
    const [category, setCategory] = useState('');

    // const _setCategory = (_category: string) => {
    //     setCategory(_category);

    //     const query: SearchQuery = {
    //         ingredients: searchModal.query.ingredients,
    //         cuisine: searchModal.query.cuisine,
    //         mealType: searchModal.query.mealType,
    //         difficulty: searchModal.query.difficulty,
    //         category: _category
    //     }

    //     searchModal.setQuery(query);
    // }

    return (
        <div className="pt-3 cursor-pointer pb-6 flex items-center space-x-12">
            <div 
                // onClick={() => _setCategory('')}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${category === '' ? 'border-black' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}>
                <FaCarrot size={20} />
                <span className='text-xs'>All</span>
            </div>
            
            <div 
                // onClick={() => _setCategory('italian')}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${category === 'italian' ? 'border-black' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}>
                <FaPizzaSlice size={20} />
                <span className='text-xs'>Italian</span>
            </div>

            <div 
                // onClick={() => _setCategory('american')}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${category === 'american' ? 'border-black' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}>
                <FaHamburger size={20} />
                <span className='text-xs'>American</span>
            </div>

            <div 
                // onClick={() => _setCategory('vegetarian')}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${category === 'vegetarian' ? 'border-black' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}>
                <FaLeaf size={20} />
                <span className='text-xs'>Vegetarian</span>
            </div>

            <div
                // onClick={() => _setCategory('seafood')} 
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${category === 'seafood' ? 'border-black' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}>
                <FaFish size={20} />
                <span className='text-xs'>Seafood</span>
            </div>
        </div>
    )
}

export default Categories;
