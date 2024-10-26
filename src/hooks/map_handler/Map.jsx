import { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import './map.css';
import UserLocation from '../user_location/UserLocation';
import Range from '../range-zooming/Range';

const INITIAL_CENTER = [118.0121, 9.2235];
const INITIAL_ZOOM = 1.5;
const mapboxAccessToken = 'pk.eyJ1IjoiYnVkZHlhcHAwMSIsImEiOiJjbHlkbmQwM3IwN29lMmhzY2xlaHB5cGdlIn0._lyRkBeBqxS-Cr6gpYYRMQ';
const DEFAULT_STYLE = 'mapbox://styles/buddyapp01/cm2bsflcg00rw01pib4gv1o9y';
const MAX_SPIN_ZOOM = 5; // Maximum zoom level to allow spinning
const SLOW_SPIN_ZOOM = 3; // Start slowing down at this zoom
const SECONDS_PER_REVOLUTION = 240; // Control spin speed
const MAX_ZOOM = 20;
const MIN_ZOOM = 1;

const Map = () => {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const userInteractingRef = useRef(false); // Store interaction state
  const [zoom, setZoom] = useState(INITIAL_ZOOM);
  const [showLocation, setShowLocation] = useState(false);

  useEffect(() => {
    mapboxgl.accessToken =
    mapboxAccessToken;

    // Initialize Mapbox map
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM,
      bearing: 360,
      style: DEFAULT_STYLE,
      interactive: true,
      projection: 'globe', // Optional: Globe view
    });

    // mapRef.current.addControl(new mapboxgl.NavigationControl());
    // mapRef.current.scrollZoom.disable();

    // mapRef.current.on('style.load', () => {
    //   mapRef.current.setFog({}); // Set atmosphere style
    // });

    // mapRef.current.on('mousedown', () => {
    //   userInteractingRef.current = true;
    // });

    // mapRef.current.on('dragstart', () => {
    //   userInteractingRef.current = true;
    // });

    // mapRef.current.on('moveend', () => {
    //   userInteractingRef.current = false;
    //   spinGlobe();
    // });
        /* Given a query in the form "lng, lat" or "lat, lng"
     * returns the matching geographic coordinate(s)
     * as search results in carmen geojson format,
     * https://github.com/mapbox/carmen/blob/master/carmen-geojson.md */
     const coordinatesGeocoder = (query) => {
      // Match anything which looks like
      // decimal degrees coordinate pair.
      const matches = query.match(
        /^[ ]*(?:Lat: )?(-?\d+\.?\d*)[, ]+(?:Lng: )?(-?\d+\.?\d*)[ ]*$/i
      );
      if (!matches) {
        return null;
      }

      function coordinateFeature(lng, lat) {
        return {
          center: [lng, lat],
          geometry: {
            type: 'Point',
            coordinates: [lng, lat]
          },
          place_name: 'Lat: ' + lat + ' Lng: ' + lng,
          place_type: ['coordinate'],
          properties: {},
          type: 'Feature'
        };
      }

      const coord1 = Number(matches[1]);
      const coord2 = Number(matches[2]);
      const geocodes = [];

      if (coord1 < -90 || coord1 > 90) {
        // must be lng, lat
        geocodes.push(coordinateFeature(coord1, coord2));
      }

      if (coord2 < -90 || coord2 > 90) {
        // must be lat, lng
        geocodes.push(coordinateFeature(coord2, coord1));
      }

      if (geocodes.length === 0) {
        // else could be either lng, lat or lat, lng
        geocodes.push(coordinateFeature(coord1, coord2));
        geocodes.push(coordinateFeature(coord2, coord1));
      }

      return geocodes;
    };

    // Add the control to the map (You will need to import MapboxGeocoder)
    mapRef.current.addControl(
      new MapboxGeocoder({
        accessToken: mapboxAccessToken,
        localGeocoder: coordinatesGeocoder,
        zoom: 16,
        placeholder: 'Search place',
        mapboxgl: mapboxgl,
        reverseGeocode: true
      }), 'top-right'
    );
  
    // Sync slider with map zoom
    mapRef.current.on('zoom', () => {
      setZoom(mapRef.current.getZoom());
    });
    
    spinGlobe(); // Start spinning on load

    return () => mapRef.current.remove();
  }, []);

  const spinGlobe = () => {
    if (
      mapRef.current &&
      !userInteractingRef.current &&
      mapRef.current.getZoom() < MAX_SPIN_ZOOM
    ) {
      let distancePerSecond = 360 / SECONDS_PER_REVOLUTION;
      const currentZoom = mapRef.current.getZoom();

      if (currentZoom > SLOW_SPIN_ZOOM) {
        const zoomDiff =
          (MAX_SPIN_ZOOM - currentZoom) / (MAX_SPIN_ZOOM - SLOW_SPIN_ZOOM);
        distancePerSecond *= zoomDiff;
      }

      const center = mapRef.current.getCenter();
      center.lng -= distancePerSecond; // Rotate to the left

      mapRef.current.easeTo({
        center,
        duration: 2000, // 1 second smooth animation
        easing: (n) => n, // Linear easing
      });
    }
  };

  const handleSliderChange = (e) => {
    const newZoom = parseFloat(e.target.value);
    setZoom(newZoom);
    mapRef.current.flyTo({ zoom: newZoom, duration: 500 });
  };

  const userLocation = UserLocation(mapRef.current);

  const handleLocationButtonClick = () => {
    setShowLocation(!showLocation);
    if (userLocation) {
      mapRef.current.flyTo({
        center: userLocation,
        zoom: 16,
        essential: true,
        duration: 1000,
      });
    } else {
      console.log('User location is not available.');
    }
  };

  const handleZoomIn = () => {
    const newZoom = mapRef.current.getZoom() - 1;
    mapRef.current.flyTo({ zoom: newZoom, duration: 1000 });
    setZoom(newZoom);
  };

  const handleZoomOut = () => {
    const newZoom = mapRef.current.getZoom() + 1;
    mapRef.current.flyTo({ zoom: newZoom, duration: 1000 });
    setZoom(newZoom);
  };


  return (
    <div ref={mapContainerRef} id="map">
       <div
      id="geocoder-container"></div>
      <button
        onClick={handleLocationButtonClick}
        style={{
          position: 'absolute',
          bottom: '60px',
          right: '455px',
          zIndex: 1,
          background: 'rgba(0, 0, 0, 0.3)',
          borderRadius: '5px',
          padding: '5px',
          border: '1px solid rgb(0, 123, 255, 0.50)',
        }}
      >
        <img
          src="/icons/location-crosshairs-solid.svg"
          alt="Location"
          style={{ width: '16px', height: '16px',}}
        />
      </button>

      <button
        onClick={handleZoomIn}
        style={{
          position: 'absolute',
          bottom: '60px',
          right: '425px',
          zIndex: 1,
          background: 'rgba(0, 0, 0, 0.3)',
          borderRadius: '5px',
          padding: '5px',
          border: '1px solid rgb(0, 123, 255, 0.50)',
        }}
      >
        <img
          src="/icons/zoom-in.png"
          alt="Zoom In"
          style={{ width: '16px', height: '16px' }}
        />
      </button>

      <button
        onClick={handleZoomOut}
        style={{
          position: 'absolute',
          bottom: '60px',
          right: '395px',
          zIndex: 1,
          background: 'rgba(0, 0, 0, 0.3)',
          borderRadius: '5px',
          padding: '5px',
          border: '1px solid rgb(0, 123, 255, 0.50)',
        }}
      >
        <img
          src="/icons/zoom-out.png"
          alt="Zoom Out"
          style={{ width: '16px', height: '16px' }}
        />
      </button>
    <Range
      zoom={zoom}
      onZoomChange={handleSliderChange}
      minZoom={MIN_ZOOM}
      maxZoom={MAX_ZOOM}
    />
    </div>
  );
};

export default Map;
