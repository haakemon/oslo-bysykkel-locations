import { StationDetails } from 'src/features/StationDetails/StationDetails';
import type { StationWithStatus } from 'src/types';

import './StationList.css';

type StationListProps = {
  stations: StationWithStatus[];
  onClickStation: (station: StationWithStatus) => void;
};

export const StationList = ({
  stations,
  onClickStation,
}: StationListProps) => {
  return (
    <ol className='station-list'>
      {stations.map((station) => {
        const handleClick = () => {
          onClickStation(station);
        };

        return (
          <li key={station.station_id}>
            <button className='station-list__item' onClick={handleClick}>
              <StationDetails station={station} />
            </button>
          </li>
        );
      })}
    </ol>
  );
};
