import type { ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/cn";

export const buttonVariants = cva(
    [
        "inline-flex items-center justify-center",
        "font-medium",
        "transition-all duration-300 ease-smooth",
        "focus-visible:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-accent",
        "focus-visible:ring-offset-2",
        "disabled:pointer-events-none",
        "disabled:opacity-50",
    ],
    {
        variants: {
            variant: {
                primary:
                    "bg-accent text-white hover:bg-accent-hover",
                light:
                    "bg-white text-ink hover:bg-paper",
                dark:
                    "bg-ink text-white hover:bg-canvas-soft",
                ghost:
                    "bg-transparent text-current hover:bg-white/10",
                outline:
                    "border border-current/15 bg-transparent text-current hover:bg-current/5",
            },
            size: {
                sm: "h-10 rounded-pill px-4 text-sm",
                md: "h-12 rounded-pill px-5 text-sm",
                lg: "h-14 rounded-pill px-7 text-sm",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "md",
        },
    },
);

interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {}

export function Button({
                           className,
                           variant,
                           size,
                           type = "button",
                           ...props
                       }: ButtonProps) {
    return (
        <button
            type={type}
            className={cn(buttonVariants({ variant, size }), className)}
            {...props}
        />
    );
}