export default function List({
  title,
  headerList,
  bodyList,
}: {
  title: string;
  headerList: string[];
  bodyList: string[][];
}) {
  const listHeaderHtml = headerList.map((header, index) => {
    return (
      <div className="list-header-item" key={index}>
        {header}
      </div>
    );
  });

  const listBodyHtml = bodyList.map((body, index) => {
    return (
      <div className="list-body-cont" key={index}>
        {body.map((item, index) => {
          return (
            <div className={`list-body-item-${index}`} key={index}>
              {item ?? "-"}
            </div>
          );
        })}
      </div>
    );
  });
  return (
    <div className="list">
      <div className="list-title">{title}</div>
      <div className="list-header">{listHeaderHtml}</div>
      <div className="list-body">{listBodyHtml}</div>
    </div>
  );
}
