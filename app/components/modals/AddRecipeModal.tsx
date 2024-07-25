'use client';

import { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import Modal from './Modal';
import CustomButton from '../forms/CustomButton';
import useAddRecipeModal from '@/app/hooks/useAddRecipeModal';
import apiService from '@/app/services/apiService';
import { useRouter } from 'next/navigation';
import Categories from '../addrecipes/Categories'
const AddRecipeModal = () => {
    // States
    const [currentStep, setCurrentStep] = useState(1);
    const [errors, setErrors] = useState<string[]>([]);
    const [dataTitle, setDataTitle] = useState('');
    const [dataDescription, setDataDescription] = useState('');
    const [dataInstructions, setDataInstructions] = useState('');
    const [dataPrepTime, setDataPrepTime] = useState('');
    const [dataCookTime, setDataCookTime] = useState('');
    const [dataServings, setDataServings] = useState('');
    const [dataCategory, setDataCategory] = useState('');
    const [dataImage, setDataImage] = useState<File | null>(null);

    const addRecipeModal = useAddRecipeModal();
    const router = useRouter();

    // Set Image
    const setImage = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const tmpImage = event.target.files[0];
            setDataImage(tmpImage);
        }
    }; 
    const setCategory = (category: string) => {
        setDataCategory(category)
    }
    // Submit Form
    const submitForm = async () => {
        console.log("submit form")
        if (
            dataTitle &&
            dataDescription &&
            dataInstructions &&
            dataPrepTime &&
            dataCookTime &&
            dataServings &&
            dataCategory &&
            dataImage
        ) {
            const formData = new FormData();
            formData.append('title', dataTitle);
            formData.append('description', dataDescription);
            formData.append('instructions', dataInstructions);
            formData.append('preparation_time', dataPrepTime);
            formData.append('cooking_time', dataCookTime);
            formData.append('servings', dataServings);
            formData.append('category', dataCategory);
            formData.append('image', dataImage);

            const response = await apiService.post('/api/recipes/create/', formData);

            if (response.success) {
                console.log('SUCCESS :-D');
                router.push('/?added=true');
                addRecipeModal.close();
            } else {
                const tmpErrors: string[] = Object.values(response).map((error: any) => error);
                setErrors(tmpErrors);
            }
        }
    };

    const content = (
        <>
            {currentStep === 1 ? (
                <>
                    <h2 className='mb-6 text-2xl'>Recipe Details</h2>
                    <div className='pt-3 pb-6 space-y-4'>
                        <div className='flex flex-col space-y-2'>
                            <label>Title</label>
                            <input
                                type="text"
                                value={dataTitle}
                                onChange={(e) => setDataTitle(e.target.value)}
                                className='w-full p-4 border border-gray-600 rounded-xl'
                            />
                        </div>
                        <div className='flex flex-col space-y-2'>
                            <label>Description</label>
                            <textarea
                                value={dataDescription}
                                onChange={(e) => setDataDescription(e.target.value)}
                                className='w-full h-[100px] p-4 border border-gray-600 rounded-xl'
                            ></textarea>
                        </div>
                    </div>
                    <CustomButton
                        label='Next'
                        onClick={() => setCurrentStep(2)}
                    />
                </>
            ) : currentStep === 2 ? (
                <>
                    <h2 className='mb-6 text-2xl'>Instructions</h2>
                    <div className='pt-3 pb-6 space-y-4'>
                        <div className='flex flex-col space-y-2'>
                            <label>Instructions</label>
                            <textarea
                                value={dataInstructions}
                                onChange={(e) => setDataInstructions(e.target.value)}
                                className='w-full h-[200px] p-4 border border-gray-600 rounded-xl'
                            ></textarea>
                        </div>
                    </div>
                    <CustomButton
                        label='Previous'
                        className='mb-2 bg-black hover:bg-gray-800'
                        onClick={() => setCurrentStep(1)}
                    />
                    <CustomButton
                        label='Next'
                        onClick={() => setCurrentStep(3)}
                    />
                </>
            ) : currentStep === 3 ? (
                <>
                    <h2 className='mb-6 text-2xl'>Additional Details</h2>
                    <div className='pt-3 pb-6 space-y-4'>
                        <div className='flex flex-col space-y-2'>
                            <label>Preparation Time (minutes)</label>
                            <input
                                type="number"
                                value={dataPrepTime}
                                onChange={(e) => setDataPrepTime(e.target.value)}
                                className='w-full p-4 border border-gray-600 rounded-xl'
                            />
                        </div>
                        <div className='flex flex-col space-y-2'>
                            <label>Cooking Time (minutes)</label>
                            <input
                                type="number"
                                value={dataCookTime}
                                onChange={(e) => setDataCookTime(e.target.value)}
                                className='w-full p-4 border border-gray-600 rounded-xl'
                            />
                        </div>
                        <div className='flex flex-col space-y-2'>
                            <label>Servings</label>
                            <input
                                type="number"
                                value={dataServings}
                                onChange={(e) => setDataServings(e.target.value)}
                                className='w-full p-4 border border-gray-600 rounded-xl'
                            />
                        </div>
                        <div className='flex flex-col space-y-2'>
                            <label>Choose Category</label>
                            <Categories
                            dataCategory={dataCategory}
                            setCategory={(category) => setCategory(category)}
                        />
                        </div>
                    </div>
                    <CustomButton
                        label='Previous'
                        className='mb-2 bg-black hover:bg-gray-800'
                        onClick={() => setCurrentStep(2)}
                    />
                    <CustomButton
                        label='Next'
                        onClick={() => setCurrentStep(4)}
                    />
                </>
            ) : (
                <>
                    <h2 className='mb-6 text-2xl'>Image</h2>
                    <div className='pt-3 pb-6 space-y-4'>
                        <div className='py-4 px-6 bg-gray-600 text-white rounded-xl'>
                            <input
                                type="file"
                                accept='image/*'
                                onChange={setImage}
                            />
                        </div>
                        {dataImage && (
                            <div className='w-[200px] h-[150px] relative'>
                                <Image
                                    fill
                                    alt="Uploaded image"
                                    src={URL.createObjectURL(dataImage)}
                                    className='w-full h-full object-cover rounded-xl'
                                />
                            </div>
                        )}
                    </div>
                    {errors.map((error, index) => (
                        <div
                            key={index}
                            className='p-5 mb-4 bg-red-600 text-black rounded-xl opacity-80'
                        >
                            {error}
                        </div>
                    ))}
                    <CustomButton
                        label='Previous'
                        className='mb-2 bg-black hover:bg-gray-800'
                        onClick={() => setCurrentStep(3)}
                    />
                    <CustomButton
                        label='Submit'
                        onClick={submitForm}
                    />
                </>
            )}
        </>
    );

    return (
        <>
            <Modal
                isOpen={addRecipeModal.isOpen}
                close={addRecipeModal.close}
                label="Add Recipe"
                content={content}
            />
        </>
    );
};

export default AddRecipeModal;
