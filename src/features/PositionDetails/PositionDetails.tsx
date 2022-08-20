import { distanceInMeters } from 'src/utils/location';

import './PositionDetails.css'

type PositionDetailsProps = {
  position?: GeolocationPosition;
};

export const PositionDetails = ({ position }: PositionDetailsProps) => {
  return (
    <div className='position-details'>
      {position
        ? (`Nøyaktighet på din posisjon: ${distanceInMeters(position.coords.accuracy)} meter`)
        : ('Hvis du deler din posisjon, kan vi vise avstand til stasjonene.')}
    </div>
  );
};
