import * as React from 'react';
import { cn } from '@components/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  setfullname?: (value: string) => void;
  setcontact?: (value: string) => void;
  setheight?: (value: number) => void;
  setweight?: (value: number) => void;
  setotp?: (value: number) => void;
  setdiet?: (value: string) => void;
  setaddress?: (value: string) => void;
}
// TODO on focus add some reponsivenesss
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      setfullname,
      setcontact,
      setheight,
      setweight,
      setdiet,
      setaddress,
      ...props
    },
    ref
  ) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (setfullname) {
        setfullname(event.target.value);
      }

      if (setcontact) {
        setcontact(event.target.value);
      }

      if (setheight) {
        setheight(Number(event.target.value));
      }

      if (setweight) {
        setweight(Number(event.target.value));
      }

      if (setdiet) {
        // setdiet(event.target.value as DietType);
      }

      if (setaddress) {
        setaddress(event.target.value);
      }
    };
    return (
      <input
        required
        type={type}
        className={cn(
          'flex h-10 w-full  border-input bg-background px-3 py-2  ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 placeholder:text-gray-400 focus:-translate-y-[2px] transition-all duration-300',
          className
        )}
        ref={ref}
        onChange={handleChange}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
