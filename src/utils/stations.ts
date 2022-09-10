import { useEffect, useState } from 'react';
import type { Station, StationsResponse, StationsStatusResponse, StationStatus, StationWithStatus } from 'src/types';
import { getDistanceToMe } from 'src/utils/location';

export enum StationsOrderBy {
  Name = 'name',
  Address = 'address',
  Capacity = 'capacity',
  DistanceToMe = 'distanceToMe',
}

type MergeStationWithStatusProps = {
  stations: Station[];
  status: StationStatus[];
};

type OrderStationsByProps = {
  stations: StationWithStatus[];
  orderBy?: StationsOrderBy;
};

type CombineStationsWithDistanceProps = {
  stations: StationWithStatus[];
  myPosition?: GeolocationPosition;
};

export enum LoadState {
  IsLoading = 'isLoading',
  IsError = 'isError',
  IsIdle = 'isIdle',
}

export const useGetStations = () => {
  const [stations, setStations] = useState<StationWithStatus[]>([]);
  const [loadState, setLoadState] = useState(LoadState.IsLoading);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const headers = {
          'Client-Identifier': 'haakemon-oslobysykkeloversikt',
        };

        const [stationsData, statusData] = await Promise.all([
          fetch('https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json', { headers }),
          fetch('https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json', { headers }),
        ]);

        const [stationsJson, statusJson]: [StationsResponse, StationsStatusResponse] = await Promise.all([
          stationsData.json(),
          statusData.json(),
        ]);
        const stationsWithStatus = mergeStationsWithStatus({
          stations: stationsJson.data.stations,
          status: statusJson.data.stations,
        });

        setStations(stationsWithStatus);
        setLoadState(LoadState.IsIdle);
      } catch (error) {
        setLoadState(LoadState.IsError);
      }
    };

    fetchStations();
  }, []);

  return { stations, loadState };
};

export const mergeStationsWithStatus = ({ stations, status }: MergeStationWithStatusProps) => {
  return stations.map((station) => {
    return {
      ...station,
      status: status.find((s) => station.station_id === s.station_id),
    };
  }) as StationWithStatus[];
};

const orderStationsByWithFallback = (
  { stations, orderBy = StationsOrderBy.DistanceToMe }: OrderStationsByProps,
) => {
  return stations.sort((a, b) => {
    const aValue = a[orderBy] || a.name;
    const bValue = b[orderBy] || b.name;

    if (aValue < bValue) {
      return -1;
    }
    if (aValue > bValue) {
      return 1;
    }
    return 0;
  });
};

export const combineStationsWithDistance = (
  { stations, myPosition }: CombineStationsWithDistanceProps,
) => {
  const stationsWithDistance = stations.map((station) => {
    return {
      ...station,
      distanceToMe: myPosition
        ? getDistanceToMe({
          myPosition,
          stationPosition: {
            latitude: station.lat,
            longitude: station.lon,
          },
        })
        : undefined,
    };
  });

  return orderStationsByWithFallback({ stations: stationsWithDistance });
};
