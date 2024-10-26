// NavigationBar.jsx
import './navigationbar.css';
import { FaCog } from 'react-icons/fa';
import { useState } from 'react';
import Settings from '../../pages/settings/Settings';

const NavigationBar = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toggleSettings = () => {
    setIsSettingsOpen((prev) => !prev);
  };

  return (
    <div className="navigationbar">
      {/* First Column - Logo and Name */}
      <div className="nav-column column-1">
        <img
          src="/images/logo.png" // Update with your actual logo file name
          alt="Logo"
          className="logo"
        />
        <span className="brand-name">EmCall</span>
      </div>

      {/* Second Column - Texts */}
      <div className="nav-column column-2">
        <p className="left-text">pangaalawang column</p>
      </div>

      {/* Third Column - Right Texts */}
      <div className="nav-column column-3">
        <p className="right-text">pangatlong comlumn </p>
        <p className="right-text">hinati sa gitna pa horizontal</p>
      </div>

      {/* Other Columns */}
      <div className="nav-column column-4">4 column</div>
      <div className="nav-column column-5">5 column</div>

    {/* Settings Icon with Dropdown */}
    <div className="nav-column column-6" ref={Settings}>
        <FaCog className="settings-icon" onClick={toggleSettings} title="Settings" />
        <Settings isOpen={isSettingsOpen} /> {/* Dropdown Menu */}
      </div>
      </div>
  );
};

export default NavigationBar;
