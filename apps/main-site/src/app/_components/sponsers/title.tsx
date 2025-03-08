import { cn } from "@/lib/utils";

export const TitleSection = ({
  title,
  description,
  className,
}: {
  title: string;
  description: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex-center w-full flex-col gap-5 px-4 py-16 text-black font-sayyeda tracking-widest",
        className,
      )}
    >
      <div className="flex-center w-[40rem] flex-col flex-wrap gap-5 px-1">
        <p className="text-4xl font-bold lg:text-7xl xl:text-6xl">
          {title}
        </p>
        <p className="text-xs sm:text-sm md:text-base">{description}</p>
      </div>
    </div>
  );
};
