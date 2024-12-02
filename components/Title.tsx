import { cn } from "@/lib/utils";

type TitleProps = {
  className?: string;
  children: React.ReactNode;
};

export default function Title({ className, children }: TitleProps) {
  return (
    <h1
      className={cn("text-3xl font-bold tracking-tight lg:text-6xl", className)}
    >
      {children}
    </h1>
  );
}
