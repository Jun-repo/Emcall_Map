import './range.css';

// eslint-disable-next-line react/prop-types
const Range = ({ zoom, onZoomChange, minZoom, maxZoom }) => {
  const kmRange = (zoom / maxZoom) * 100; // Adjust this based on your zoom to distance mapping

  return (
    <div className="range-container">
      {/* Ruler with vertical lines */}
      <div className="ruler">
        {Array.from({ length: maxZoom + 1 }, (_, i) => (
          <div key={i} className="ruler-line" />
        ))}
      </div>
      
      <input
        type="range"
        min={minZoom}
        max={maxZoom}
        step="0.1"
        value={zoom}
        onChange={onZoomChange}
        className="zoom-slider" // Use your existing zoom slider class
      />
      
      <div className="zoom-labels">
        <span>0 km</span>
        <span>{kmRange.toFixed(1)} km</span>
      </div>
    </div>
  );
};

export default Range;
