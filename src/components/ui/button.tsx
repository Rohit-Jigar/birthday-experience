import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400/50 disabled:pointer-events-none disabled:opacity-50 active:scale-95 cursor-pointer select-none",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-rose-500/80 to-pink-600/80 text-white shadow-lg shadow-rose-950/40 hover:from-rose-500 hover:to-pink-600 border border-rose-300/30",
        glass:
          "glass-button text-rose-100 hover:text-white shadow-md shadow-black/20",
        ghost:
          "hover:bg-white/10 text-rose-200/80 hover:text-rose-100",
        outline:
          "border border-rose-300/30 bg-transparent hover:bg-rose-500/10 text-rose-100",
        champagne:
          "bg-gradient-to-r from-[#F2D7B0] to-[#E8A5B8] text-[#160D22] font-semibold shadow-lg shadow-black/40 hover:opacity-95",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 px-4 text-xs",
        lg: "h-13 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "glass",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
