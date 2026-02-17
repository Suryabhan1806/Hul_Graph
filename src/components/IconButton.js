import './common.css';

const IconButton = ({ Icon, onClick, active }) => {
  return (
    <button
      className={`common-btn icon-only ${active ? 'active' : ''}`}
      onClick={onClick}
    >
      <Icon fontSize="small" />
    </button>
  );
};

export default IconButton;
