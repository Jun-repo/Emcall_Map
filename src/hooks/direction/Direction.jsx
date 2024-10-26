import { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import './direction.css';
import Map from '../map_handler/Map';

const Direction = () => {
  const mapContainerRef = useRef(null);
  const start = Map.INITIAL_CENTER; // Starting point
  const mapboxAccessToken = Map.mapboxAccessToken;

  useEffect(() => {
    // Initialize Mapbox map
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: Map.DEFAULT_STYLE,
      center: start,
      zoom: 12,
    });

    // Set the bounds of the map
    const bounds = [
      [-123.069003, 45.395273],
      [-122.303707, 45.612333],
    ];
    map.setMaxBounds(bounds);

    // Function to get route
    const getRoute = async (end) => {
      const query = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxAccessToken}`,
        { method: 'GET' }
      );
      const json = await query.json();
      const data = json.routes[0];

      const route = data.geometry.coordinates;
      const geojson = {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: route,
        },
      };

      // Add route layer
      if (map.getSource('route')) {
        map.getSource('route').setData(geojson);
      } else {
        map.addLayer({
          id: 'route',
          type: 'line',
          source: {
            type: 'geojson',
            data: geojson,
          },
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#3887be',
            'line-width': 5,
            'line-opacity': 0.75,
          },
        });
      }

      // Add turn instructions
      const instructions = document.getElementById('instructions');
      const steps = data.legs[0].steps;
      let tripInstructions = '';
      for (const step of steps) {
        tripInstructions += `<li>${step.maneuver.instruction}</li>`;
      }
      instructions.innerHTML = `<p><strong>Trip duration: ${Math.floor(data.duration / 60)} min 🚴 </strong></p><ol>${tripInstructions}</ol>`;
    };

    // Click event to get destination
    map.on('click', (event) => {
      const coords = Object.keys(event.lngLat).map((key) => event.lngLat[key]);
      const end = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'Point',
              coordinates: coords,
            },
          },
        ],
      };
      if (map.getLayer('end')) {
        map.getSource('end').setData(end);
      } else {
        map.addLayer({
          id: 'end',
          type: 'circle',
          source: {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  properties: {},
                  geometry: {
                    type: 'Point',
                    coordinates: coords,
                  },
                },
              ],
            },
          },
          paint: {
            'circle-radius': 10,
            'circle-color': '#f30',
          },
        });
      }
      getRoute(coords);
    });

    return () => map.remove();
  }, [mapboxAccessToken, start]);

  return (
    <div>
      <div id="map" ref={mapContainerRef} className="map-container"></div>
      <div id="instructions"></div>
    </div>
  );
};

export default Direction;
