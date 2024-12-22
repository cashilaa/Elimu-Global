// components/ui/card.tsx
import React from "react";

const Card = React.forwardRef((props, ref) => {
  const { className } = props;
  return (
    <div
      ref={ref}
      className={`rounded-lg border border-slate-200 bg-white text-slate-950 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 ${className}`}
      {...props}
    />
  );
})
Card.displayName = "Card"

const CardHeader = 
  <HTMLDivElement />
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className="flex flex-col space-y-1.5 p-6"
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = 
  <HTMLHeadingElement />
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className="text-2xl font-semibold leading-none tracking-tight"
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<

  <HTMLParagraphElement />
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className="text-sm text-slate-500 dark:text-slate-400"
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  
  <HTMLDivElement />
>(({ className, ...props }, ref) => (
  <div ref={ref} className="p-6 pt-0" {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = 
  <HTMLDivElement />
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className="flex items-center p-6 pt-0"
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }