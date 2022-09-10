import { Icon, IconVariant } from 'src/components/Icon';
import type { StationWithStatus } from 'src/types';
import { distanceInMeters } from 'src/utils/location';

import './StationDetails.css';

export type StationDetailsProps = {
  station: StationWithStatus;
  showAddress?: boolean;
};

export const StationDetails = ({ station, showAddress = true }: StationDetailsProps) => {
  return (
    <div className='station-details'>
      <div>
        <span className='station-details__name'>{station.name}</span>
        {showAddress
          ? (
            <>
              , <span className='station-details__address'>{station.address}</span>
            </>
          )
          : null}
      </div>
      {station.distanceToMe
        ? (
          <div className='station-details__distance' title='Avstand til stasjonen'>
            <Icon variant={IconVariant.Distance} /> {distanceInMeters(station.distanceToMe)} m.
          </div>
        )
        : null}
      <div className='station-details__bike-status'>
        <div className='staion-details__contents' title='Antall ledige sykler'>
          <Icon variant={IconVariant.Bicycle} /> <span>{station.status.num_bikes_available}</span>
        </div>
        <span>{'/'}</span>
        <div className='staion-details__contents' title='Antall ledige parkeringsplasser'>
          <Icon variant={IconVariant.Parking} /> <span>{station.status.num_docks_available}</span>
        </div>
      </div>
    </div>
  );
};
