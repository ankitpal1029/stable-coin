const Input = ({
  placeholder,
  name,
  type,
  // value,
  handleChange,
}: {
  placeholder: string;
  name: string;
  type: string;
  // value: string;
  handleChange: Function;
}) => {
  return (
    <input
      placeholder={placeholder}
      type={type}
      step="0.0001"
      // value={value}
      onChange={(e) => handleChange(e, name)}
      className="btn modal-button text-white w-full mt-3 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer"
    />
  );
};

export default Input;
