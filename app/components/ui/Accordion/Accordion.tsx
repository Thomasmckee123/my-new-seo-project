import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

export interface AccordionHeaderProps {
  children: ReactNode;
  onClick?: () => void;
}
export interface AccordionBodyProps {
  isOpen?: boolean;
  children: ReactNode;
}

export interface AccordionProps {
  id: string;
  className?: string;
  children: ReactNode;
  isOpen?: boolean;
}

const AccordionHeader = ({ children, onClick }: AccordionHeaderProps) => {
  return (
    <button className="w-full h-full rounded-md" onClick={onClick}>
      <div>{children}</div>
    </button>
  );
};

const AccordionBody = ({ isOpen, children }: AccordionBodyProps) => {
  return (
    <div
      className={cn('overflow-hidden transition-all duration-500 bg-white rounded-md ease-in-out', {
        'max-h-screen opacity-100 px-4 pb-4 ': isOpen,
        'max-h-0 opacity-0': !isOpen,
      })}
    >
      <div>{children}</div>
    </div>
  );
};

const Accordion = ({ children, className }: AccordionProps) => {
  return (
    <div className={cn('w-full mx-auto bg-white shadow-lg rounded-lg border border-gray-200', className)}>
      {children}
    </div>
  );
};
Accordion.Header = AccordionHeader;
Accordion.Body = AccordionBody;

export default Accordion;
