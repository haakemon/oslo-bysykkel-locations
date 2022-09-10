import type { StationsResponse, StationsStatusResponse } from 'src/types';

export const stationInformationResponse = {
  'last_updated': 1662808808,
  'ttl': 10,
  'version': '2.2',
  'data': {
    'stations': [
      {
        'station_id': '2351',
        'name': 'Sogn Studentby',
        'address': 'Jon P Erliens vei 1',
        'rental_uris': {
          'android': 'oslobysykkel://stations/2351',
          'ios': 'oslobysykkel://stations/2351',
        },
        'lat': 59.95208441268443,
        'lon': 10.727852791011173,
        'capacity': 18,
      },
      {
        'station_id': '2350',
        'name': 'Blindern T-Bane',
        'address': 'Apalveien 60',
        'rental_uris': {
          'android': 'oslobysykkel://stations/2350',
          'ios': 'oslobysykkel://stations/2350',
        },
        'lat': 59.94022899411701,
        'lon': 10.716856460117071,
        'capacity': 25,
      },
    ],
  },
} as StationsResponse;

export const stationStatusResponse = {
  'last_updated': 1662808808,
  'ttl': 10,
  'version': '2.2',
  'data': {
    'stations': [
      {
        'station_id': '2351',
        'is_installed': 1,
        'is_renting': 1,
        'is_returning': 1,
        'last_reported': 1662808808,
        'num_bikes_available': 6,
        'num_docks_available': 12,
      },
      {
        'station_id': '2350',
        'is_installed': 1,
        'is_renting': 1,
        'is_returning': 1,
        'last_reported': 1662808808,
        'num_bikes_available': 15,
        'num_docks_available': 10,
      },
    ],
  },
} as StationsStatusResponse;
