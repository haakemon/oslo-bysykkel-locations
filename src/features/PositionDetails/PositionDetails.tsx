import { distanceInMeters } from 'src/utils/location';

type PositionDetailsProps = {
  position: GeolocationPosition;
};

export const PositionDetails = ({ position }: PositionDetailsProps) => {
  return <div>Nøyaktighet på din posisjon: {distanceInMeters(position.coords.accuracy)} meter</div>;
};
