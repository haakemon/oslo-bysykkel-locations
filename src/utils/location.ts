import HaversineGeolocation from 'haversine-geolocation';
import { useEffect, useState } from 'react';

export const useGeoLocation = () => {
  const [position, setPosition] = useState<GeolocationPosition>();

  useEffect(() => {
    if (!navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition(setPosition);
  }, []);

  return { position };
};

type GetDistanceToMeProps = {
  myPosition: GeolocationPosition;
  stationPosition: {
    latitude: number;
    longitude: number;
  };
};

export const getDistanceToMe = ({ myPosition, stationPosition }: GetDistanceToMeProps) => {
  if (!myPosition.coords) {
    return undefined;
  }
  return HaversineGeolocation.getDistanceBetween(
    { latitude: myPosition.coords.latitude, longitude: myPosition.coords.longitude },
    stationPosition,
    'm',
  );
};

export const distanceInMeters = (distance: number) => {
  return new Intl.NumberFormat().format(distance);
};
