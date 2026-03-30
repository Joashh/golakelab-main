import { ReactNode } from "react";


type Props = {
  children: ReactNode;
};

export default function LakeCategoriesLayout({ children }: Props) {
  return (
    <div className="flex gap-6">
      <main className="flex-1 p-4">
       {children}
        
      </main>
    </div>
  );
}