import { useState } from 'react';

import { Loader } from 'src/components/Loader';
import { Map } from 'src/features/Map/Map';
import { PositionDetails } from 'src/features/PositionDetails/PositionDetails';
import { StationList } from 'src/features/StationList/StationList';
import { StationWithStatus } from 'src/types';
import { useGeoLocation } from 'src/utils/location';
import { combineStationsWithDistance, useGetStations } from 'src/utils/stations';

import './app.css';

export const App = () => {
  const { position } = useGeoLocation();
  const { stations, isLoading } = useGetStations();
  const stationsWithDistance = combineStationsWithDistance({ stations, myPosition: position });
  const [stationIdFocus, setStationIdFocus] = useState('');

  if (isLoading) {
    return <Loader alt='Laster stasjonsinformasjon' />;
  }

  const handleClickStation = (station: StationWithStatus) => {
    setStationIdFocus(station.station_id);
  };

  return (
    <div className='app'>
      <div className='app__header'>
        <h1>Oslo Bysykkel stasjoner</h1>
        <PositionDetails position={position} />
      </div>
      <div className='app__station-list'>
        <StationList stations={stationsWithDistance} onClickStation={handleClickStation} />
      </div>
      <div className='app__map'>
        <Map stations={stationsWithDistance} position={position} stationIdFocus={stationIdFocus} />
      </div>
    </div>
  );
};
