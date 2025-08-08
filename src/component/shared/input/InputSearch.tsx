import { AiOutlineSearch } from "react-icons/ai";

const InputSearch = ({
  placeholder,
  inputValue,
  setInputValue,
  fieldRequired,
  label,
  css,
  classDefName,
}: {
  placeholder?: string;
  inputValue: string | undefined;
  setInputValue: (data: string) => void;
  fieldRequired?: boolean;
  label?: string;
  css?: string;
  classDefName?: string;
}) => {
  return (
    <div className={`flex flex-col`}>
      <label
        className={`${
          fieldRequired ? "after:content-['*'] after:text-red-500" : ""
        } `}
      >
        {label}
      </label>
      <div
        className={`flex items-center border border-gray-300 rounded-md ${
          classDefName ? classDefName : ""
        }`}
      >
        <span className="w-[40px] flex justify-center">
          <AiOutlineSearch />
        </span>
        <input
          type="text"
          placeholder={placeholder}
          className={`${css ? css : "h-[44px] w-[150px] lg:w-[150px] "} p-2`}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          style={{ outline: "none" }}
        />
      </div>
    </div>
  );
};

export default InputSearch;
