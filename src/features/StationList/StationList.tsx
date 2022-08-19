import { StationDetails } from 'src/features/StationDetails/StationDetails';
import type { StationWithStatus } from 'src/types';

type StationListProps = {
  stations: StationWithStatus[];
};

export const StationList = ({
  stations,
}: StationListProps) => {
  return (
    <ol>
      {stations.map((station) => {
        return (
          <li key={station.station_id}>
            <StationDetails station={station} />
          </li>
        );
      })}
    </ol>
  );
};
