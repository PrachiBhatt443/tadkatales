interface CustomButtonProps {
    label: string;
    className?: string;
    onClick: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
    label,
    className,
    onClick,
}) => {
    return (
        <button 
            onClick={onClick}
            className={`w-full py-4 bg-green-500 hover:bg-green-600 text-white text-center rounded-xl transition cursor-pointer ${className}`}
        >
            {label}
        </button>
    )
}

export default CustomButton;
