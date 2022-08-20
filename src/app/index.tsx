import { Loader } from 'src/components/Loader';
import { PositionDetails } from 'src/features/PositionDetails/PositionDetails';
import { StationList } from 'src/features/StationList/StationList';
import { useGeoLocation } from 'src/utils/location';
import { combineStationsWithDistance, useGetStations } from 'src/utils/stations';

export const App = () => {
  const { position } = useGeoLocation();
  const { stations, isLoading } = useGetStations();
  const stationsWithDistance = combineStationsWithDistance({ stations, myPosition: position });

  if (isLoading) {
    return <Loader alt='Laster stasjonsinformasjon' />;
  }

  return (
    <div>
      <h1>Oslo Bysykkel stasjoner</h1>
      {position
        ? <PositionDetails position={position} />
        : <div>Hvis du deler din posisjon, kan vi vise avstand til stasjonene.</div>}
      <StationList stations={stationsWithDistance} />
    </div>
  );
};
