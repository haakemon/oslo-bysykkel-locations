import { render as rtlRender, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from './index';

import { rest } from 'msw';
import { stationInformationResponse, stationStatusResponse } from 'src/mocks/apiResponses';
import { handlers } from 'src/mocks/handlers';
import { setupServer } from 'test/testUtils';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('App', () => {
  it('should show loading', () => {
    render();

    expect(screen.getByRole('img', {
      name: /laster stasjonsinformasjon/i,
    })).toBeInTheDocument();
  });

  it('should show list of stations after load is done', async () => {
    render();

    await waitForElementToBeRemoved(() =>
      screen.queryByRole('img', {
        name: /laster stasjonsinformasjon/i,
      })
    );

    expect(screen.queryByRole('img', {
      name: /laster stasjonsinformasjon/i,
    })).not.toBeInTheDocument();

    expect(screen.queryByText(
      /beklager, en uventet feil har oppstått\. prøv å laste siden på nytt/i,
    )).not.toBeInTheDocument();

    expect(screen.getByRole('button', {
      name: /blindern t\-bane/i,
    })).toBeInTheDocument();

    expect(screen.getByRole('button', {
      name: /sogn studentby/i,
    })).toBeInTheDocument();
  });

  it('should show error when fetching stations fails', async () => {
    server.use(
      rest.get(
        'https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json',
        (req, res, ctx) => {
          return res.networkError('networkError');
        },
      ),
      rest.get(
        'https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json',
        (req, res, ctx) => {
          return res.networkError('networkError');
        },
      ),
    );

    render();

    await waitForElementToBeRemoved(() =>
      screen.queryByRole('img', {
        name: /laster stasjonsinformasjon/i,
      })
    );

    expect(screen.queryByRole('img', {
      name: /laster stasjonsinformasjon/i,
    })).not.toBeInTheDocument();

    expect(screen.queryByRole('button', {
      name: /blindern t\-bane/i,
    })).not.toBeInTheDocument();

    expect(screen.queryByRole('button', {
      name: /sogn studentby/i,
    })).not.toBeInTheDocument();

    expect(screen.getByText(
      /beklager, en uventet feil har oppstått\. prøv å laste siden på nytt/i,
    )).toBeInTheDocument();
  });
});

const render = () => {
  rtlRender(<App />);
};
