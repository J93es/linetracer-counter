export default function SelectForm({
  id,
  selectList,
  register,
  errorMessage,
}: {
  id: string;
  selectList: string[];
  register: Function;
  errorMessage: string;
}) {
  return (
    <div className="form-group">
      <label htmlFor={id}>현재 경연 부문</label>
      <select id={id} className="form-control" {...register(id)}>
        {selectList.map((elem) => {
          return <option key={elem}>{elem}</option>;
        })}
      </select>
      <small className="form-text text-muted">{errorMessage}</small>
    </div>
  );
}
