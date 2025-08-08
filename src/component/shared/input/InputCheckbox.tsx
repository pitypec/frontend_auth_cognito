const InputCheckbox = ({
  label,
  labelPosition,
  handleChange,
  isChecked,
}: {
  label: string;
  labelPosition: "labelRight" | "labelLeft";
  handleChange: () => void;
  isChecked: boolean;
}) => {
  const placement: Record<string, string> = {
    labelRight: "flex flex-row justify-between",
    labelLeft: "flex flex-row-reverse jutify-between",
  };
  return (
    <div className={`w-full ${placement[labelPosition]} `}>
      <label>{label}</label>
      <input type="checkbox" checked={isChecked} onChange={handleChange} />
    </div>
  );
};

export default InputCheckbox;
