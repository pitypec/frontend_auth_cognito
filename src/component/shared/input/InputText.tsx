import React, { type Dispatch, type SetStateAction } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

interface props {
  placeholder: string;
  label: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void | void;
  value: string;
  name: string;
  unit?: string;
  type: string;
  inputClassName?: string;
  error: string | undefined;
  fieldRequired?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  textStyle?: string;
  viewPassword?: boolean;
  rightIcon?: boolean;
  rowFormat?: boolean;
  setViewPassword?: Dispatch<SetStateAction<boolean>>;
  labelStyle?: string;
}
const InputText = ({
  placeholder,
  label,
  handleChange,
  value,
  name,
  unit = "",
  type = "text",
  inputClassName,
  error,
  fieldRequired = false,
  readOnly = false,
  disabled = false,
  textStyle = "",
  viewPassword,
  rightIcon,
  rowFormat = false,
  setViewPassword,
  labelStyle,
  ...prop
}: props) => {
  return (
    <>
      <div
        className={`flex  ${rowFormat ? "flex-row" : "flex-col gap-2"} w-full ${
          textStyle ? textStyle : ""
        }`}
      >
        <label
          className={`${labelStyle} whitespace-nowrap ${
            fieldRequired ? "after:content-['*'] after:text-red-500" : ""
          } `}
        >
          {label}
        </label>
        <div className="flex w-full border border-gray-300">
          {unit ? (
            <span className="bg-white w-[40px] text-sm flex items-center justify-center">
              {unit}
            </span>
          ) : (
            ""
          )}
          <input
            type={type ? type : "text"}
            placeholder={placeholder}
            onChange={handleChange}
            value={value}
            readOnly={readOnly}
            disabled={disabled}
            name={name}
            className={` h-[44px] w-full rounded-[8px] p-[10px] ${inputClassName} ${
              readOnly ? "bg-[#F9FAFB]" : ""
            }`}
            style={{ outline: 0 }}
            {...prop}
          />
          {rightIcon && (
            <span className="flex items-center w-[20px] h-[44px]">
              {viewPassword ? (
                <IoEyeOutline
                  onClick={() => {
                    if (setViewPassword) {
                      setViewPassword(false);
                    }
                  }}
                />
              ) : (
                <IoEyeOffOutline
                  onClick={() => {
                    if (setViewPassword) {
                      setViewPassword(true);
                    }
                  }}
                />
              )}
            </span>
          )}
        </div>
        {error && !rowFormat ? <p className="text-red-500">{error}</p> : ""}
      </div>
      {/* {error && rowFormat ? <p className="text-red-500">{error}</p> : ""} */}
    </>
  );
};

export default InputText;
