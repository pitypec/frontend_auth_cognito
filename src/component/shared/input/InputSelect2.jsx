const InputSelect2 = ({
  options = [],
  label,
  css,
  handleChange,
  value,
  name,
  placeholder,
  fieldRequired,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          className={`${
            fieldRequired ? "after:content-['*'] after:text-red-500" : ""
          }`}
        >
          {label}
        </label>
      )}
      <select
        className={`border border-gray-300 h-[44px] ${
          css ? css : "lg:w-[288px] sm:w-[140px] md:w-[200px]"
        } p-2 rounded-md`}
        onChange={handleChange}
        value={value}
        name={name}
        {...props}
      >
        <option value={0}>{placeholder}</option>
        {options.map((option, index) => {
          return (
            <option className="p-2" key={index} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default InputSelect2;
