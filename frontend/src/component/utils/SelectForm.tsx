export default function SelectForm({
  id,
  label,
  selectList,

  register,
  errorMessage,
}: {
  id: string;
  label: string;
  selectList: string[];

  register: Function;
  errorMessage: string;
}) {
  return (
    <div className="select-form">
      <div className="form-group">
        <label htmlFor={id}>
          <h5>{label}</h5>
        </label>
        <select id={id} className="form-control" {...register(id)}>
          {selectList.map((elem) => {
            return <option key={elem}>{elem}</option>;
          })}
        </select>
        <small className="form-text text-muted">{errorMessage}</small>
      </div>
    </div>
  );
}
