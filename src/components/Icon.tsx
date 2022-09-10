import { ReactComponent as BicycleIcon } from 'src/assets/icons/bicycle.svg';
import { ReactComponent as DistanceIcon } from 'src/assets/icons/distance.svg';
import { ReactComponent as ParkingIcon } from 'src/assets/icons/parking.svg';

import './Icon.css';

export enum IconVariant {
  Bicycle = 'bicycle',
  Distance = 'distance',
  Parking = 'parking',
}

type IconProps = {
  variant: IconVariant;
};

export const getComponent = (variant: IconVariant) => {
  switch (variant) {
    case IconVariant.Bicycle:
      return BicycleIcon;
    case IconVariant.Distance:
      return DistanceIcon;
    case IconVariant.Parking:
      return ParkingIcon;
    default:
      throw new Error(`Unknown variant: ${variant}`);
  }
};

export const Icon = ({ variant }: IconProps) => {
  const Component = getComponent(variant);
  return <Component className='icon' data-testid={`icon-${variant}`} />;
};
