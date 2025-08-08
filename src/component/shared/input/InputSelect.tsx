// import React from "react";

const InputSelect = ({
  options = [],
  label,
  css,
  handleChange,
  value,
  name,
  placeholder,
  error,
  fieldRequired,
  containerClass,
  labelStyle,
  id,
  ...props
}: {
  options: { label: string; value: string }[];
  label: string;
  css: string;
  handleChange: (e: any) => void | void;
  value: string;
  name: string;
  placeholder: string;
  error: string;
  id?: string;
  fieldRequired: boolean;
  containerClass: string;
  labelStyle?: string;
}) => {
  return (
    <div
      className={`flex flex-col gap-2 ${
        containerClass ? containerClass : ""
      } w-full`}
    >
      {label && (
        <label
          className={`${labelStyle} ${
            fieldRequired ? "after:content-['*'] after:text-red-500" : ""
          }`}
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <select
        className={`border p-[2px] border-gray-300 h-[44px] bg-[center_95%_top_6px] bg-[url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 -960 960 960' width='24'><path d='M480-345 240-585l43-43 197 198 197-197 43 43-240 239Z' /></svg>")] bg-no-repeat ${
          css ? css : "w-full"
        }"
        } pr-[2rem] rounded-md`}
        onChange={handleChange}
        value={value}
        name={name}
        id={id}
        {...props}
        style={{ outline: "none" }}
      >
        <option className="text-[#667085]">{placeholder}</option>
        {options.map((data: Record<string, string>, index: number) => {
          return (
            <option className="p-2" key={index} value={data?.value}>
              {data?.label}
            </option>
          );
        })}
      </select>
      {error ? <p className="text-red-500">{error}</p> : ""}
    </div>
  );
};

export default InputSelect;
