import { distanceInMeters } from 'src/utils/location';

import './PositionDetails.css'

export type PositionDetailsProps = {
  accuracy?: GeolocationCoordinates['accuracy'];
};

export const PositionDetails = ({ accuracy }: PositionDetailsProps) => {
  return (
    <div className='position-details'>
      {accuracy
        ? (`Nøyaktighet på din posisjon: ${distanceInMeters(accuracy)} meter`)
        : ('Hvis du deler din posisjon, kan vi vise avstand til stasjonene.')}
    </div>
  );
};
