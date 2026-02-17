import React from 'react';
import './common.css';

const CommonTable = ({ 
  data, 
  columns,
  className = '' 
}) => {
  return (
    <div className={`common-table-basic-container ${className}`}>
      <div className="table-responsive">
        <table className="common-table-basic">
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
                <td colSpan={columns.length} className="no-data-basic">
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