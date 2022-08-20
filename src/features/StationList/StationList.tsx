import { StationDetails } from 'src/features/StationDetails/StationDetails';
import type { StationWithStatus } from 'src/types';

import './StationList.css';

type StationListProps = {
  stations: StationWithStatus[];
};

export const StationList = ({
  stations,
}: StationListProps) => {
  return (
    <ol className='station-list'>
      {stations.map((station) => {
        return (
          <li key={station.station_id}>
            <div className='station-list__item'>
              <StationDetails station={station} />
            </div>
          </li>
        );
      })}
    </ol>
  );
};
