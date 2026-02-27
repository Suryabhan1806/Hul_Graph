import React from 'react';
import styles from './CommonTable.module.css';

const CommonTable = ({ 
  data, 
  columns,
  className = '' 
}) => {
  return (
    <div className={`${styles.commonTableContainer} ${className}`}>
      <div className={styles.tableResponsive}>
        <table className={styles.commonTable}>
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th 
                  key={index} 
                  style={{ 
                    width: column.width || 'auto',
                    textAlign: column.align || 'left'
                  }}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((column, colIndex) => (
                    <td 
                      key={colIndex}
                      style={{ textAlign: column.align || 'left' }}
                    >
                      {column.render 
                        ? column.render(row[column.accessor], row, rowIndex)
                        : row[column.accessor]
                      }
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className={styles.noData}>
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommonTable;