import { Loader } from 'src/components/Loader';
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
      <StationList stations={stationsWithDistance} />
    </div>
  );
};
