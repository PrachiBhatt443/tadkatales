import { create } from "zustand";

interface AddRecipeModalStore {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

const useAddRecipeModal = create<AddRecipeModalStore>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false })
}));

export default useAddRecipeModal;