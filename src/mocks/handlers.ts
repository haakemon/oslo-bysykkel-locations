import { rest } from 'msw';
import { stationInformationResponse, stationStatusResponse } from './apiResponses';

export const handlers = [
  rest.get(
    'https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json',
    (req, res, ctx) => {
      return res(ctx.json(stationInformationResponse));
    },
  ),
  rest.get(
    'https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json',
    (req, res, ctx) => {
      return res(ctx.json(stationStatusResponse));
    },
  ),
];
