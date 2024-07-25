import { FaCarrot, FaPizzaSlice, FaHamburger, FaLeaf, FaFish } from 'react-icons/fa';

interface CategoriesProps {
    dataCategory: string;
    setCategory: (category: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({ dataCategory, setCategory }) => {
    return (
        <div className="pt-3 cursor-pointer pb-6 flex items-center space-x-12">
            <div 
                onClick={() => setCategory('all')}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory === 'all' ? 'border-gray-800' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}
            >
                <FaCarrot size={20} />
                <span className='text-xs'>All</span>
            </div>

            <div 
                onClick={() => setCategory('italian')}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory === 'italian' ? 'border-gray-800' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}
            >
                <FaPizzaSlice size={20} />
                <span className='text-xs'>Italian</span>
            </div>

            <div 
                onClick={() => setCategory('american')}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory === 'american' ? 'border-gray-800' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}
            >
                <FaHamburger size={20} />
                <span className='text-xs'>American</span>
            </div>

            <div 
                onClick={() => setCategory('vegetarian')}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory === 'vegetarian' ? 'border-gray-800' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}
            >
                <FaLeaf size={20} />
                <span className='text-xs'>Vegetarian</span>
            </div>

            <div 
                onClick={() => setCategory('seafood')}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory === 'seafood' ? 'border-gray-800' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}
            >
                <FaFish size={20} />
                <span className='text-xs'>Seafood</span>
            </div>
        </div>
    );
}

export default Categories;
