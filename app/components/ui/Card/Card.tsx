import { cn } from "@/app/lib/utils";
import React from "react";

export type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export type CardHeaderProps = {
  children: React.ReactNode;
};

export type CardBodyProps = {
  children: React.ReactNode;
};

export type CardFooterProps = {
  children: React.ReactNode;
};

const CardBody = ({ children }: { children: React.ReactNode }) => (
  <div className="text-gray-700">{children}</div>
);

const CardFooter = ({ children }: CardFooterProps) => (
  <div className="sm:border-t border-gray-300 border-t-none">{children}</div>
);

const CardHeader = ({ children }: CardHeaderProps) => (
  <div className="flex items-center gap-2 cursor-pointer">{children}</div>
);

const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={cn("rounded-2xl border border-gray-200 relative", className)}
    >
      {children}
    </div>
  );
};

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
