import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import type { CodeDialogProps } from "@/interfaces/quiz.interface";
import {  Copy } from "lucide-react"
import { FaCheckCircle } from "react-icons/fa";
import { toast } from "sonner";


export default function CodeDialog({isSuccessDialogOpen,setIsSuccessDialogOpen,quizCode,handleCreateNewQuiz}:CodeDialogProps) {
    const copyQuizCode = () => {
        navigator.clipboard.writeText(quizCode);
        toast.success("Quiz code copied to clipboard!");
      };
  return (
    <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center space-y-4 py-6">
            <div className="w-16 h-16 rounded-full flex items-center justify-center">
              <FaCheckCircle className="w-14 h-14 " />
            </div>
            
            <DialogHeader className="text-center">
              <DialogTitle className="text-xl font-semibold">
                Quiz Created Successfully!
              </DialogTitle>
            </DialogHeader>
            
            <div className="w-full flex items-stetch justify-center">
              <label className="inline-flex items-center px-2 rounded-l-md bg-orange-100 text-xs font-medium border border-r-0 border-gray-300 whitespace-nowrap min-w-16">
                Code
              </label>
              <div className="flex items-center space-x-2">
                <Input
                  value={quizCode}
                  readOnly
                  className="font-mono text-center rounded-l-none text-lg font-semibold bg-gray-50"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={copyQuizCode}
                  className="px-3"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              
            </div>
            <p className="text-xs text-gray-500 text-center">
                Share this code with participants to join the quiz
              </p>
            <div className="flex space-x-2 pt-4">
              <Button 
                variant="outline" 
                onClick={handleCreateNewQuiz}
                className="flex-1"
              >
                Create Another Quiz
              </Button>
              <Button 
                onClick={() => setIsSuccessDialogOpen(false)}
                className="flex-1"
              >
                Done
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
  )
}
