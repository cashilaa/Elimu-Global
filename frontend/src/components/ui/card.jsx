import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const cardVariants = cva(
  "rounded-lg transition-all duration-200",
  {
    variants: {
      variant: {
        default: "bg-white border border-gray-200 shadow-sm hover:shadow-md dark:bg-gray-800 dark:border-gray-700",
        ghost: "bg-transparent border-none shadow-none hover:bg-gray-50 dark:hover:bg-gray-800",
        outlined: "bg-transparent border border-gray-200 hover:border-gray-300 dark:border-gray-700",
        elevated: "bg-white shadow-lg hover:shadow-xl dark:bg-gray-800",
        flat: "bg-gray-50 border border-gray-100 dark:bg-gray-900 dark:border-gray-800",
      },
      size: {
        sm: "p-4",
        default: "p-6",
        lg: "p-8",
      },
      isInteractive: {
        true: "cursor-pointer transform hover:-translate-y-1",
        false: "",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      isInteractive: false,
    }
  }
);

const Card = React.forwardRef(({ 
  className, 
  variant, 
  size,
  isInteractive,
  isLoading,
  children, 
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        cardVariants({ variant, size, isInteractive }),
        isLoading && "animate-pulse",
        className
      )}
      {...props}
    >
      {isLoading ? (
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 w-5/6"></div>
        </div>
      ) : children}
    </div>
  );
});

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "font-semibold leading-none tracking-tight text-lg text-gray-900 dark:text-gray-100",
      className
    )}
    {...props}
  />
));

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-sm text-gray-500 dark:text-gray-400",
      className
    )}
    {...props}
  />
));

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-6 pt-0", className)}
    {...props}
  />
));

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center p-6 pt-0",
      className
    )}
    {...props}
  />
));

// Add display names for better debugging
Card.displayName = "Card";
CardHeader.displayName = "CardHeader";
CardTitle.displayName = "CardTitle";
CardDescription.displayName = "CardDescription";
CardContent.displayName = "CardContent";
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};