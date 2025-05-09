import React from 'react';
import { Button } from '@/components/ui/button';

interface SubmitButtonProps {
  isSubmitting: boolean;
  loadingText?: string;  
  buttonText: string;   
  icon?: React.ReactNode; 
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ isSubmitting, loadingText, buttonText, icon }) => {
  return (
    <Button type="submit" disabled={isSubmitting} className="flex items-center gap-2">
      {isSubmitting && icon && <span className="animate-spin">{icon}</span>}
      {isSubmitting ? loadingText : buttonText}
    </Button>
  );
};

export default SubmitButton;
