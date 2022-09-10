import { useState } from 'react';

import { Loader } from 'src/components/Loader';
import { Map } from 'src/features/Map/Map';
import { PositionDetails } from 'src/features/PositionDetails/PositionDetails';
import { StationList } from 'src/features/StationList/StationList';
import { StationWithStatus } from 'src/types';
import { useGeoLocation } from 'src/utils/location';
import { combineStationsWithDistance, useGetStations, LoadState } from 'src/utils/stations';


import './app.css';

export const App = () => {
  const { position } = useGeoLocation();
  const { stations, loadState } = useGetStations();
  const stationsWithDistance = combineStationsWithDistance({ stations, myPosition: position });
  const [stationIdFocus, setStationIdFocus] = useState('');

  if (loadState === LoadState.IsLoading) {
    return <Loader alt='Laster stasjonsinformasjon' />;
  }

  if (loadState === LoadState.IsError) {
    return <div>Beklager, en uventet feil har oppstått. Prøv å laste siden på nytt</div>
  }

  const handleClickStation = (station: StationWithStatus) => {
    setStationIdFocus(station.station_id);
  };

  return (
    <div className='app'>
      <div className='app__header'>
        <h1>Oslo Bysykkel stasjoner</h1>
        <PositionDetails accuracy={position?.coords?.accuracy} />
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
