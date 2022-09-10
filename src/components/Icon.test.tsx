import { render, screen } from '@testing-library/react';
import { ReactComponent as BicycleIcon } from 'src/assets/icons/bicycle.svg';
import { ReactComponent as DistanceIcon } from 'src/assets/icons/distance.svg';
import { ReactComponent as ParkingIcon } from 'src/assets/icons/parking.svg';
import { describe, expect, it } from 'vitest';
import { getComponent, Icon, IconVariant } from './Icon';

describe('Icon', () => {
  it('should return the correct component for Bicycle variant', () => {
    render(<Icon variant={IconVariant.Bicycle} />);
    expect(screen.getByTestId(`icon-${IconVariant.Bicycle}`)).toBeInTheDocument();
  });

  describe('getComponent', () => {
    it('should return the correct component for Bicycle variant', () => {
      const result = getComponent(IconVariant.Bicycle);

      expect(result).toBe(BicycleIcon);
    });

    it('should return the correct component for Distance variant', () => {
      const result = getComponent(IconVariant.Distance);

      expect(result).toBe(DistanceIcon);
    });

    it('should return the correct component for Parking variant', () => {
      const result = getComponent(IconVariant.Parking);

      expect(result).toBe(ParkingIcon);
    });

    it('should throw error when invalid variant is passed', () => {
      expect(() => getComponent('invalid' as IconVariant)).toThrowError(`Unknown variant: invalid`);
    });
  });
});
