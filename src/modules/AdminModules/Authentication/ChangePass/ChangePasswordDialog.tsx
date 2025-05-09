import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import ChangePassword from "./ChangePass";

const ChangePasswordDialog: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Change Your Password</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Password Dialog</DialogTitle>
        </DialogHeader>
        <ChangePassword />
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordDialog;
