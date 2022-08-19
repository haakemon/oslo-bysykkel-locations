import type { StationWithStatus } from 'src/types';
import { distanceInMeters } from 'src/utils/location';

type StationDetailsProps = {
  station: StationWithStatus;
};

export const StationDetails = ({ station }: StationDetailsProps) => {
  return (
    <div>
      <div>Navn: {station.name}</div>
      <div>Adresse: {station.address}</div>
      {station.distanceToMe
        ? <div>Avstand: {distanceInMeters(station.distanceToMe)} meter</div>
        : null}
      <div>Ledige sykler: {station.status?.num_bikes_available}</div>
      <div>Ledige plasser: {station.status?.num_docks_available}</div>
    </div>
  );
};
