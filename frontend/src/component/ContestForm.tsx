export default function ContestForm({}) {
  return (
    <form>
      <div className="form-group">
        <label htmlFor="year">경연 연도(id)</label>
        <input
          type="number"
          className="form-control"
          id="year"
          aria-describedby="yearHelp"
          placeholder="Enter year"
        />
        <small id="yearHelp" className="form-text text-muted">
          year is a unique id for contest, it should be number
        </small>
      </div>

      <div className="form-group">
        <label htmlFor="title">경연 이름</label>
        <input
          type="title"
          className="form-control"
          id="title"
          placeholder="title"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}
