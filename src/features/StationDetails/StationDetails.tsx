import type { StationWithStatus } from 'src/types';
import { distanceInMeters } from 'src/utils/location';

import './StationDetails.css';

type StationDetailsProps = {
  station: StationWithStatus;
};

export const StationDetails = ({ station }: StationDetailsProps) => {
  return (
    <div className='station-details'>
      <div>
        <span className='station-details__name'>{station.name}</span>,{' '}
        <span className='station-details__address'>{station.address}</span>
      </div>
      {station.distanceToMe
        ? <div className='station-details__distance'>Avstand: {distanceInMeters(station.distanceToMe)} meter</div>
        : null}
      <div className='station-details__bike-status'>
        Sykler: {station.status?.num_bikes_available}, {' '}
        Ledige plasser: {station.status?.num_docks_available}
      </div>
    </div>
  );
};
