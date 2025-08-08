// import { FormikErrors } from "formik";
import Select from "react-select";
// import { placeholderCSS } from "react-select/dist/declarations/src/components/Placeholder";
// import "./InputField.css";

const customStyles = {
  // Style for the control (the input container)
  control: (provided: any, state: any) => ({
    // Example: Apply a border and box shadow when focused
    ...provided,
    border: "1px solid #d3d3d3",
    // border: state.isFocused ? "1px solid #d3d3d3" : "1px solid #d3d3d3",
    "&:hover": {
      border: "1px solid #d3d3d3", // Remove the blue outline border on hover
    },
    boxShadow: "0 0 1px #d3d3d3",
    borderRadius: "6px",
    // marginTop: "8px",

    // padding: "5px",
    width: "100%",
    height: "44px",
    outline: state.isFocused ? "none" : "none",
    // fontFamily: "",
    // fontSize: "12px",
    // padding: "12px 16px",
  }),

  // Style for the option in the dropdown menu
  option: (provided: any, state: any) => ({
    // Example: Change background color and font color when hovered
    ...provided,
    backgroundColor: state.isFocused ? "#f0f0f0" : "white",
    color: state.isFocused ? "#292929" : "#292929",
    fontWeight: state.isFocused ? "500" : "400",
    cursor: "pointer",
  }),

  // Style for the menu (the dropdown list)
  menu: (provided: any) => ({
    // Example: Change the border and background color of the menu
    ...provided,
    border: "2px solid #ccc",
    backgroundColor: "white",
  }),
};

const SearchableDropdown = ({
  options,
  placeholder,
  label,
  handleChange,
  selectedOption,
  error,
  fieldRequired,
  defaultValue,
  wrapperClassName,
  // dropDownStyle,
  defaultInputValue,
  isClearable,
  ...props
}: {
  options: any[];
  placeholder: string;
  label: string;
  handleChange(e: any): void;
  selectedOption?: any[];
  error?: string;
  fieldRequired?: boolean;
  defaultValue?: string;
  wrapperClassName?: string;
  dropDownStyle?: string;
  defaultInputValue?: string;
  isClearable?: boolean;
}) => {
  return (
    <div
      // style={dropDownStyle}
      className={`${wrapperClassName}`}
    >
      {label ? (
        <label
          className={`${
            fieldRequired ? "after:content-['*'] after:text-red-500" : ""
          }`}
        >
          {label}
        </label>
      ) : (
        ""
      )}
      <Select
        isClearable={isClearable}
        options={options}
        value={selectedOption}
        styles={customStyles}
        defaultValue={defaultValue}
        // className={`${className ? className : "w-[200px] lg:w-[280px]"}`}
        defaultInputValue={defaultInputValue}
        // isClearable
        placeholder={placeholder}
        onChange={handleChange}
        noOptionsMessage={() => "Fetching data.."}
        {...props}
      />
      {error ? <p className="text-red-500">{error}</p> : ""}
    </div>
  );
};

export default SearchableDropdown;
