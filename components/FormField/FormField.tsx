import { FC } from "react";

interface IFormField {
  type?: string;
  title: string;
  state: string;
  placeholder: string;
  isTextAria?: boolean;
  setState: (value: string) => void;
}
export const FormField: FC<IFormField> = ({
  type,
  title,
  state,
  placeholder,
  isTextAria,
  setState,
}) => {
  return (
    <div className="flexState flex-col w-full gap-4">
      <label className="w-full text-gray-100">{title}</label>
    </div>
  );
};
