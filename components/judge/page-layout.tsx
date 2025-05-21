import { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <div className="container relative flex h-full flex-col">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-[10%] -top-[30%] h-[500px] w-[500px] rounded-full bg-purple-200/30 blur-3xl dark:bg-purple-900/20" />
          <div className="absolute -left-[10%] top-[20%] h-[300px] w-[300px] rounded-full bg-pink-200/30 blur-3xl dark:bg-pink-900/20" />
          <div className="absolute -bottom-[10%] right-[20%] h-[400px] w-[400px] rounded-full bg-indigo-200/30 blur-3xl dark:bg-indigo-900/20" />
        </div>
        {children}
      </div>
    </div>
  );
}
