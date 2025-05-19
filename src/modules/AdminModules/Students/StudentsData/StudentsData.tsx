import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Check, CirclePlus, SquarePen } from "lucide-react";
import { useState } from "react";
import type { Student } from "@/interfaces/student.interface";
import { useAddStudentMutation, useUpdateStudentMutation } from "@/store/auth/StudentApi";
import { toast } from "sonner";


export default function StudentsDataDialog({
  mode = "update",
  instructorData,
}: {
  mode?: "add" | "update";
  instructorData?: Student;
}) {
  const [open, setOpen] = useState(false);
  const [updateStudent] = useUpdateStudentMutation();
  const [addStudent] = useAddStudentMutation();
  const form = useForm<Student>({
    defaultValues: instructorData || {
      first_name: "",
      last_name: "",
      email: "",
      status: "",
      role: "",
    },
  });

  const onSubmit = async (data: Student) => {
    console.log("Form Data: ", data);
    setOpen(false);
    if (mode === "update") {
      try {
        await updateStudent(data).unwrap();
        toast.success("Student updated successfully");
      } catch (error) {
        console.error("Error updating student: ", error);
        toast.error("Error updating student");
      }

    }


    if (mode === "add") {
      try {
        await addStudent(data).unwrap();
        console.log("Student added successfully");
        toast.success("Student added successfully");
      } catch (error) {
        console.error("Error adding student: ", error);
        toast.error("Error adding student");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={`${mode === "add" ? "mb-4  border rounded-2xl hover:bg-black hover:border-black hover:text-white transition-colors  " : "h-0 w-0  hover:bg-transparent"} flex ms-auto border-0 bg-transparent text-black`}>{mode === "update" ? < SquarePen className="text-balck :hove:text-white transition-colors" /> : <><CirclePlus className="mr-2 h-4 w-4 text-balck :hove:text-white transition-colors" /> <span>Add Student</span></>}</Button>
      </DialogTrigger>
      <DialogContent className="p-0 overflow-hidden max-w-md">
        <div className="border-b flex items-center justify-between px-4 py-2">
          <DialogHeader>
            <DialogTitle>{mode === "update" ? "Update Student" : "Add Student"}</DialogTitle>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" className="border-inline" size="icon" onClick={form.handleSubmit(onSubmit)}>
              <Check className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <X className="w-10 h-5 text-2xl font-bold" />
            </Button>
          </div>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4">
          {[
            { label: "First Name", name: "first_name" },
            { label: "Last Name", name: "last_name" },
            { label: "Email", name: "email" },
            { label: "Status", name: "status" },
            { label: "Role", name: "role" },
          ].map((field) => (
            <div className="relative" key={field.name}>
              <label className="absolute border border-[#e2e8f0] border-e-0 h-[100%] w-[90px] font-semibold rounded-sm left-0 top-0 bg-orange-50 text-sm px-2 py-1 rounded-bl-md rounded-tr-md text-gray-800">
                {field.label}
              </label>
              <Input
                placeholder={`Please Enter ${field.label}`}
                {...form.register(field.name as keyof Student, { required: true })}
                className="pl-[100px]"
              />
            </div>
          ))}
        </form>
      </DialogContent>
    </Dialog >
  );
}
