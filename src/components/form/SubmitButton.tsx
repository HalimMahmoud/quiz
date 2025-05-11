import React from 'react';
import { Button } from '@/components/ui/button';
import { FaCheckCircle } from "react-icons/fa";


interface SubmitButtonProps {
  isSubmitting: boolean;
  loadingText?: string;  
  buttonText: string;   
  icon?: React.ReactNode; 
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ isSubmitting, loadingText, buttonText, icon }) => {
  return (
    <Button type="submit" disabled={isSubmitting} className="flex items-center gap-2 bg-[#f5f5f5] cursor-pointer text-black hover:bg-black  hover:text-[#f5f5f5]">
      {isSubmitting && icon && <span className="animate-spin">{icon}</span>}
      {isSubmitting ? loadingText : buttonText}
      {!isSubmitting && <FaCheckCircle/>}
    </Button>
  );
};

export default SubmitButton;
