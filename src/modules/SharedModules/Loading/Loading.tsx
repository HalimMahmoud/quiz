import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className=" flex text-sm text-muted-foreground items-center justify-center">
      <LoaderCircle className="animate-spin mr-2 h-5 w-5" />
      Loading...
    </div>
  );
}
