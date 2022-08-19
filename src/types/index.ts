export type Station = {
  station_id: string;
  name: string;
  address: string;
  rental_uris: {
    android: string;
    ios: string;
  };
  lat: number;
  lon: number;
  capacity: number;
};

export type StationStatus = {
  station_id: string;
  is_installed: number;
  is_renting: number;
  is_returning: number;
  last_reported: number;
  num_bikes_available: number;
  num_docks_available: number;
};

export type StationWithStatus = Station & {
  status: StationStatus;
  distanceToMe: number | undefined;
};
