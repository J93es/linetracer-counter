import "component/utils/Accordion.css";

export default function Accordion({
  id,
  body,
  title,
}: {
  id: string;
  body: any;
  title: string;
}) {
  return (
    <div className="accordion" id={id}>
      <div className="accordion-item">
        <h2 className="accordion-header" id={id}>
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#collapse${id}`}
            aria-expanded="true"
            aria-controls={`collapse${id}`}
          >
            {title}
          </button>
        </h2>
        <div
          id={`collapse${id}`}
          className="accordion-collapse collapse show bg-info"
          aria-labelledby={id}
          data-bs-parent={`#${id}`}
        >
          <div className="accordion-body">{body}</div>
        </div>
      </div>
    </div>
  );
}
