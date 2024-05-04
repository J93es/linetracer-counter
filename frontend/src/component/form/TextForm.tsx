export default function TextForm({
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
    <div className="form-group">
      <label id={id}>{label}</label>
      <input
        id={id}
        type="text"
        className="form-control"
        placeholder={placeholder}
        {...register(id)}
      />
      <small className="form-text text-muted">{errorMessage}</small>
    </div>
  );
}
