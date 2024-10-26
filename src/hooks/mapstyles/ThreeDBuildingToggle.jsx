/* eslint-disable react/prop-types */
// ThreeDBuildingToggle.jsx

import '@fortawesome/fontawesome-free/css/all.min.css';
import './threeDBuildingToggle.css'; // Import CSS for styling if necessary

const ThreeDBuildingToggle = ({ is3DEnabled, onToggle }) => {
  return (
    <div className="three-d-toggle">
      <button onClick={onToggle} className={`mapboxgl-ctrl-icon ${is3DEnabled ? 'active' : ''}`}>
        <i className={`fa-solid fa-building ${is3DEnabled ? 'enabled' : ''}`}></i>
      </button>
    </div>
  );
};

export default ThreeDBuildingToggle;
