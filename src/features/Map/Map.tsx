import { useEffect } from 'react';
import { Circle, MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';

import { StationDetails } from 'src/features/StationDetails/StationDetails';
import type { StationWithStatus } from 'src/types';

import 'leaflet/dist/leaflet.css';
import './Map.css';

type MapListProps = {
  stations: StationWithStatus[];
  position?: GeolocationPosition;
  stationIdFocus?: StationWithStatus['station_id'];
};

const getCenterAndZoom = ({ stations, position, stationIdFocus }: MapListProps) => {
  let zoom = 12;
  if (position && !stationIdFocus) {
    return { lat: position.coords.latitude, lng: position.coords.longitude, zoom };
  } else {
    let station = stations[0];

    if (stationIdFocus) {
      station = stations.find((x) => x.station_id === stationIdFocus) as StationWithStatus;
      zoom = 14;
    }

    return { lat: station.lat, lng: station.lon, zoom };
  }
};

export const Map = ({ stations, position, stationIdFocus }: MapListProps) => {
  const { lat, lng, zoom } = getCenterAndZoom({ stations, position, stationIdFocus });

  return (
    <MapContainer
      className='map'
      zoom={zoom}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {stations.map((station) => {
        return (
          <Marker key={station.station_id} position={[station.lat, station.lon]}>
            <Popup>
              <StationDetails station={station} showAddress={false} />
            </Popup>
          </Marker>
        );
      })}
      {position
        ? (
          <Circle
            center={[position.coords.latitude, position.coords.longitude]}
            pathOptions={{ fillColor: 'red', color: 'red' }}
            radius={100}
          />
        )
        : null}
      <RecenterAutomatically lat={lat} lng={lng} zoom={zoom} />
    </MapContainer>
  );
};

type RecenterAutomaticallyProps = {
  lat: number;
  lng: number;
  zoom: number;
};

const RecenterAutomatically = ({ lat, lng, zoom }: RecenterAutomaticallyProps) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], zoom);
  }, [lat, lng]);
  return null;
};
