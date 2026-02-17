import './common.css';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import TableChartIcon from '@mui/icons-material/TableChart';

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
    <button className="common-btn export-btn" onClick={exportToXls}>
      <TableChartIcon className="export-icon" />
      <span className="export-text">Export</span>
    </button>
  );
};

export default ExportButton;
