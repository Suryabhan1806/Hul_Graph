import "./commonLineTable.css";

const CommonZoneTable = ({ data, columns }) => {
  return (
    <div className="table-wrapper">
      <div className="table-scroll">
        <table className="zone-table">
          <thead>
            <tr>
              <th className="sticky-col">Weekly Trend</th>
              {columns.map((col, index) => (
                <th key={index}>{col}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td className="sticky-col row-title">{row.label}</td>

                {row.values.map((cell, colIndex) => (
                  <td
                    key={colIndex}
                    className={`zone-cell ${
                      row.zones?.[colIndex]?.toLowerCase() || ""
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommonZoneTable;
