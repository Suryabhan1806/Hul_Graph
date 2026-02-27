import { FileXlsIcon } from '@phosphor-icons/react';
// import './common.css';
import styles from './ExportButton.module.css';

const ExportButton = ({ data, fileName = 'export.xls' }) => {

  const exportToXls = () => {
    if (!data || data.length === 0) return;

    let table = '<table><tr>';

    // 🔹 Dynamic headers
    const headers = Object.keys(data[0]);
    headers.forEach(header => {
      table += `<th>${header}</th>`;
    });

    table += '</tr>';

    // 🔹 Dynamic rows
    data.forEach(row => {
      table += '<tr>';
      headers.forEach(header => {
        table += `<td>${row[header]}</td>`;
      });
      table += '</tr>';
    });

    table += '</table>';

    const blob = new Blob([table], {
      type: 'application/vnd.ms-excel'
    });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
  };

  return (
    <button className={styles.exportBtn} onClick={exportToXls}>
      <FileXlsIcon className={styles.exportIcon} />
      <span className={styles.exportText}>Export</span>
    </button>
  );
};

export default ExportButton;
