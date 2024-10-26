// Settings.jsx
import './settings.css';

// eslint-disable-next-line react/prop-types
const Settings = ({ isOpen }) => {
  return (
    <div id='settings'>
    <div className={`settings-menu ${isOpen ? 'show' : ''}`}>
      <ul>
        <li>Profile</li>
        <li>Preferences</li>
        <li>Logout</li>
      </ul>
    </div>
    </div>
  );
};

export default Settings;
