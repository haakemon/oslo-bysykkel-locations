import { render as rtlRender, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { StationDetails } from './StationDetails';
import type { StationDetailsProps } from './StationDetails';

const stationAddress = 'Apalveien 60';
const getStationProps = () => ({
  station_id: '2350',
  name: 'Blindern T-Bane',
  address: stationAddress,
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
});

describe('StationDetails', () => {
  it('should show address by default', () => {
    render();

    expect(screen.getByText(stationAddress)).toBeInTheDocument();
  });

  it('should show address when "showAddress" is true', () => {
    render({ showAddress: true });

    expect(screen.getByText(stationAddress)).toBeInTheDocument();
  });

  it('should not show address when "showAddress" is false', () => {
    render({ showAddress: false });

    expect(screen.queryByText(stationAddress)).not.toBeInTheDocument();
  });

  it('should show distance to station when station.distanceToMe is set', () => {
    const station = {
      ...getStationProps(),
      distanceToMe: 101,
    };
    render({station});

    expect(screen.getByTitle(/Avstand til stasjonen/i)).toBeInTheDocument();
    expect(screen.getByText(/101 m\./i)).toBeInTheDocument();
  });

  it('should not show distance to station when station.distanceToMe is not set', () => {
    const station = {
      ...getStationProps(),
      distanceToMe: undefined,
    };
    render({station});

    expect(screen.queryByTitle(/Avstand til stasjonen/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/101 m\./i)).not.toBeInTheDocument();
  });
});

const render = (props: Partial<StationDetailsProps> = {}) => {
  const allProps = {
    station: {
      ...getStationProps(),
    },
    ...props,
  } as StationDetailsProps;

  rtlRender(<StationDetails {...allProps} />);
};
