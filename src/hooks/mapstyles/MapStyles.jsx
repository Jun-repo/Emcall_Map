/* eslint-disable react/prop-types */

import './mapstyles.css'; // Import the CSS file

const MapStyles = ({ style, onChange, mapStyles }) => {
  return (
    <div className="style-selector">
      <select onChange={onChange} value={style}>
        {mapStyles.map((mapStyle) => (
          <option key={mapStyle.value} value={mapStyle.value}>
            {mapStyle.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MapStyles;
