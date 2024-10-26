import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useState } from 'react';

const UserLocation = (map) => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { longitude, latitude } = position.coords;
          setLocation([longitude, latitude]);

          // Update the map position to the user's current location
          if (map) {
            map.setCenter([longitude, latitude]);
          }
      const userCoordinates = [position.coords.longitude, position.coords.latitude];
           // Create a custom marker using the 3D icon from the public folder
      const icon = document.createElement('img');
      icon.src = '/icons/target-tracker.png'; // Ensure this path matches the icon in your public folder
      icon.style.width = '400px';
      icon.style.height = '400px';
      icon.style.objectFit = 'contain';

      // Create the marker and add it to the map
      new mapboxgl.Marker(icon)
        .setLngLat(userCoordinates)
        .addTo(map);

      // Optionally return the coordinates
      return userCoordinates;
        },
        (error) => {
          console.error("Error getting location: ", error);
        },
        { enableHighAccuracy: true }
      );

      // Cleanup function to stop watching the user's location
      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    }
  }, [map]);

  return location;
};

export default UserLocation;
