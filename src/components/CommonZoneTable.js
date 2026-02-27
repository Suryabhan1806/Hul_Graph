import "./commonLineTable.css";
import styles from './CommonZoneTable.module.css';

const CommonZoneTable = ({ data, columns }) => {
  return (
    <div className={styles.tableWrapper} >
      <div className={styles.tableScroll} >
        <table className={styles.zoneTable}>
          <thead>
            <tr>
              <th className={styles.stickyCol}>Weekly Trend</th>
              {columns.map((col, index) => (
                <th key={index}>{col}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td className={`${styles.stickyCol} ${styles.rowTitle}`}>{row.label}</td>

                {row.values.map((cell, colIndex) => (
                  <td
                    key={colIndex}
                    className={`${styles.zoneCell} ${
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
