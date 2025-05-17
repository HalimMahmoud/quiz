import { Info } from "lucide-react";

export default function NoData({ item }: { item: string }) {
  return (
    <div className="flex flex-col h-screen w-screen">
      <div className=" flex text-sm text-muted-foreground flex-1 border rounded-md p-4 m-4 items-center justify-center">
        <Info className="mr-2 h-5 w-5" />
        No {item} found
      </div>
    </div>
  );
}
