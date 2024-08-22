import { memo } from "react";

function DescriptionMain(): JSX.Element {
  return (
    <div className="descriptionContainer" >
      <h2 style={{ textAlign: "center", fontSize: "36px" }}>
        Объединяйся. Планируй. Записывай.
      </h2>
      <p style={{ textAlign: "center", fontSize: "20px" }}>
        Пиши совместные заметки в удобном приложении!
      </p>
    </div>
  );
}

export default memo(DescriptionMain);
