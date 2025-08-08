import Select, { components } from "react-select"; // import "./InputField.css";
// import { AiOutlineSearch } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import AsyncSelect from "react-select/async";
const customStyles = {
  // Style for the control (the input container)
  control: (provided: any) => ({
    // Example: Apply a border and box shadow when focused
    ...provided,
    // border: "1px solid #d3d3d3",
    // border: state.isFocused ? "1px solid #d3d3d3" : "1px solid #d3d3d3",
    "&:hover": {
      border: "1px solid #d3d3d3", // Remove the blue outline border on hover
    },
    boxShadow: "0 0 1px #d3d3d3",
    borderRadius: "12px",
    // marginTop: "8px",

    // padding: "5px",
    width: "100%",
    height: "44px",
    // outline: state.isFocused ? "none" : "none",
    // fontFamily: "",
    fontSize: "12px",
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

  valueContainer: (base: any) => ({
    ...base,
    paddingLeft: 24,
  }),
};

// const DropdownIndicator = (props: DropdownIndicatorProps<"blue", true>) => {
//   return (
//     <components.DropdownIndicator {...props}>
//       {/* <EmojiIcon label="Emoji" primaryColor={colourOptions[2].color} /> */}
//     </components.DropdownIndicator>
//   );
// };

const ValueContainer = ({ children, ...props }: any) => {
  return (
    components.ValueContainer && (
      <components.ValueContainer {...props}>
        {!!children && (
          <CiSearch
            className="w-[24px]"
            style={{ position: "absolute", left: 6, width: 24 }}
          />
        )}
        {children}
      </components.ValueContainer>
    )
  );
};

const SearchableDropdown2 = ({
  options,
  placeholder,
  label,
  handleChange,
  selectedOption,
  error,
  fieldRequired,
  defaultValue,
  className,
  // dropDownStyle,
  defaultInputValue,
  loadOptions,
  handleInputChange,
  sync = false,
  ...props
}: {
  options: any[];
  placeholder?: string;
  label: string;
  handleChange(e: any): void;
  selectedOption?: any[];
  className?: string;
  loadOptions?: () => void;
  handleInputChange?: () => void;
  sync?: boolean;
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
      className={`${
        className ? className : "w-[140px] md:w-[200px] lg:w-[288px]"
      }`}
    >
      {label ? (
        <label
          className={` text-[14px] ${
            fieldRequired ? "after:content-['*'] after:text-red-500" : ""
          }`}
        >
          {label}
        </label>
      ) : (
        ""
      )}
      {sync ? (
        <AsyncSelect
          options={options}
          value={selectedOption}
          styles={customStyles}
          defaultValue={defaultValue}
          loadOptions={loadOptions}
          defaultOptions
          onInputChange={handleInputChange}
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
            ValueContainer,
          }}
          // className={`${className ? className : "w-[200px] lg:w-[280px]"}`}
          defaultInputValue={defaultInputValue}
          // isClearable
          placeholder={placeholder}
          onChange={handleChange}
          noOptionsMessage={() => "Fetching data.."}
          {...props}
        />
      ) : (
        <Select
          options={options}
          value={selectedOption}
          styles={customStyles}
          defaultValue={defaultValue}
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
            ValueContainer,
          }}
          // className={`${className ? className : "w-[200px] lg:w-[280px]"}`}
          defaultInputValue={defaultInputValue}
          // isClearable
          placeholder={placeholder}
          onChange={handleChange}
          noOptionsMessage={() => "Fetching data.."}
          {...props}
        />
      )}
      {error ? <p className="text-red-500">{error}</p> : ""}
    </div>
  );
};

export default SearchableDropdown2;
