import * as React from "react";
import { DietType } from "@components/HealthProfile/healthprofileform";
import { cn } from "@components/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  setfullname?: (value: string) => void;
  setcontact?: (value: number) => void;
  setheight?: (value: number) => void;
  setweight?: (value: number) => void;
  setotp?: (value: number) => void;
  setdiet?: (value: string) => void;
}

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
      ...props
    },
    ref
  ) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (setfullname) {
        setfullname(event.target.value);
      }

      if (setcontact) {
        setcontact(Number(event.target.value));
      }

      if (setheight) {
        setheight(Number(event.target.value));
      }

      if (setweight) {
        setweight(Number(event.target.value));
      }

      if (setdiet) {
        setdiet(event.target.value as DietType);
      }

      if (props.onChange) {
        props.onChange(event);
      }
    };
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        onChange={handleChange}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
