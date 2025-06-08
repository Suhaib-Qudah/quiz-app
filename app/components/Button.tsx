import React from "react";

export type ButtonProps = {
    variant?: "default" | "outline" | "ghost" | "link" | "destructive";
    size?: "sm" | "md" | "lg";
    isLoading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;


export const Button: React.FC<ButtonProps> = ({
                                                  className,
                                                  variant = "default",
                                                  size = "md",
                                                  isLoading = false,
                                                  children,
                                                  ...props
                                              }) => {
    return (
        <button
            className={className}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {children}
        </button>
    )
}