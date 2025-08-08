const InputFile = ({
  // ref,
  inputId,
  placeholder,
  label,
  handleChange,
  value,
  name,
  error,
}: any) => {
  return (
    <div className="flex flex-col gap-2">
      <label>{label}</label>
      <input
        // ref={ref}
        id={inputId}
        type="file"
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        name={name}
        className="border border-gray-300 h-[44px] min-w-[288px] p-2 rounded-md background-image: url('https://static.thenounproject.com/png/101791-200.png') background-repeat: no-repeat"
        style={{ outline: "none" }}
      />
      {error ? <p className="text-red-500">{error}</p> : ""}
    </div>
  );
};

export default InputFile;
