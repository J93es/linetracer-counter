export default function NumberForm({
  id,
  placeholder,
  label,

  register,
  errorMessage,
}: {
  id: string;
  placeholder: string;
  label: string;

  register: Function;
  errorMessage: string;
}) {
  return (
    <div className="number-form">
      <div className="form-group">
        <label htmlFor={id}>
          <h5>{label}</h5>
        </label>
        <input
          id={id}
          type="number"
          className="form-control"
          placeholder={placeholder}
          autoComplete="on"
          {...register(id, {
            valueAsNumber: true,
          })}
        />
        <small className="form-text text-muted">{errorMessage}</small>
      </div>
    </div>
  );
}
