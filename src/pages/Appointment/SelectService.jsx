const SelectService = ({
  label,
  options,
  value,
  setValue,
  reset,
  name,
}) => {
  return (
    <div className="flex flex-col gap-2 flex-1">
      <select
        value={reset ? "" : value}
        onChange={(e) => setValue(e.target.value)}
        id="select-address"
        className="input-appoint mt-1">
        <option value="">{`--Chọn ${label}--`}</option>
        {options?.map((item) => {
          return (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectService;
