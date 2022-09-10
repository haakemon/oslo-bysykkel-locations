import { render as rtlRender, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { StationList } from './StationList';
import type { StationListProps } from './StationList';

const station = {
  station_id: '2350',
  name: 'Blindern T-Bane',
  address: 'Apalveien 60',
  rental_uris: {
    android: 'oslobysykkel://stations/2350',
    ios: 'oslobysykkel://stations/2350',
  },
  lat: 59.94022899411701,
  lon: 10.716856460117071,
  capacity: 25,
  status: {
    station_id: '2350',
    is_installed: 1,
    is_renting: 1,
    is_returning: 1,
    last_reported: 1662670206,
    num_bikes_available: 0,
    num_docks_available: 24,
  },
};

const user = userEvent.setup();

describe('StationList', () => {
  it('should call onClickStation with station when button is clicked', async () => {
    const handleClick = vi.fn();
    render({ onClickStation: handleClick });

    const btn = screen.getByRole('button', {
      name: /blindern t\-bane/i,
    });

    await user.click(btn);

    expect(handleClick).toHaveBeenCalledWith(station);
  });
});

const render = (props: Partial<StationListProps> = {}) => {
  const allProps = {
    stations: [station],
    onClickStation: vi.fn(),
    ...props,
  } as StationListProps;

  rtlRender(<StationList {...allProps} />);
};
