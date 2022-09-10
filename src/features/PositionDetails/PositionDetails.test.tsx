import { render as rtlRender, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PositionDetails } from './PositionDetails';
import type { PositionDetailsProps } from './PositionDetails';

describe('PositionDetails', () => {
  it('should show information message when accuracy is undefined', () => {
    render();

    expect(screen.queryByText(/Nøyaktighet på din posisjon/)).not.toBeInTheDocument();
    expect(screen.getByText('Hvis du deler din posisjon, kan vi vise avstand til stasjonene.'))
      .toBeInTheDocument();
  });

  it('should show location precision when accuracy is defined', () => {
    render({
      accuracy: 10,
    });

    expect(screen.getByText('Nøyaktighet på din posisjon: 10 meter')).toBeInTheDocument();
    expect(screen.queryByText('Hvis du deler din posisjon, kan vi vise avstand til stasjonene.')).not.toBeInTheDocument();
  });
});

const render = (props: Partial<PositionDetailsProps> = {}) => {
  const allProps = {
    ...props,
  } as PositionDetailsProps;

  rtlRender(<PositionDetails {...allProps} />);
};
