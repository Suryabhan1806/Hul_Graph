import './common.css';

const TableIconButton = ({ Icon, onClick, active }) => {
  return (
    <button
      className={`common-btn icon-only table-btn ${active ? 'active' : ''}`}
      onClick={onClick}
    >
      <Icon />
    </button>
  );
};

export default TableIconButton;
