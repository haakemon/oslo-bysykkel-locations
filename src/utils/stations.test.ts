import { renderHook, waitFor } from '@testing-library/react';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { mergeStationsWithStatus, useGetStations, LoadState } from './stations';

import { rest } from 'msw';
import { stationInformationResponse, stationStatusResponse } from 'src/mocks/apiResponses';
import { handlers } from 'src/mocks/handlers';
import { setupServer } from 'test/testUtils';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const mergedStationResult = mergeStationsWithStatus({
  stations: stationInformationResponse.data.stations,
  status: stationStatusResponse.data.stations,
});

describe('stations', () => {
  describe('useGetStations', () => {
    it('should return empty station list loadState should be IsLoading while fetching stations', () => {
      const { result } = renderHook(() => useGetStations());

      expect(result.current).toEqual({
        loadState: LoadState.IsLoading,
        stations: [],
      });
    });

    it('should return merged stations result and loadState should be IsIdle when fetching has succeeded', async () => {
      const { result } = renderHook(() => useGetStations());

      await waitFor(() => {
        expect(result.current).toEqual({
          loadState: LoadState.IsIdle,
          stations: mergedStationResult,
        });
      });
    });

    it('should return empty stations list and loadState should be IsError when fetching fails', async () => {
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

      const { result } = renderHook(() => useGetStations());

      await waitFor(() => {
        expect(result.current).toEqual({
          loadState: LoadState.IsError,
          stations: [],
        });
      });
    });
  });
});
