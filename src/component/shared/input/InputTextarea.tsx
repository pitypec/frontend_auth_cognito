import React from "react";

interface props {
  placeholder: string;
  label: string;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void | void;
  value: string;
  name: string;
  unit: string;
  type: string;
  className: string;
  error: string | undefined;
  fieldRequired?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  textStyle: string;
  labelStyle: string;
  viewPassword?: boolean;
  rightIcon?: boolean;
}
const InputTextarea = ({
  placeholder,
  label,
  handleChange,
  value,
  name,
  // unit = "",
  // type = "text",
  className,
  // error,
  fieldRequired = false,
  // readOnly = false,
  // disabled = false,
  // textStyle = "",
  // viewPassword,
  // rightIcon,
  labelStyle,
  ...props
}: props) => {
  return (
    <div className="flex flex-col w-full">
      {label && (
        <label
          className={`p-2 ${labelStyle} ${
            fieldRequired ? "after:content-['*'] after:text-red-500" : ""
          }`}
        >
          {label}
        </label>
      )}
      <textarea
        name={name}
        className={className}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        {...props}
      />
    </div>
  );
};

export default InputTextarea;
