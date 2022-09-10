# Oslo Bysykkel overview

This is a simple application which shows a list of all bysykkel locations, and how many bikes/docks are available.

If you allow geolocation access, it will also show the distance to the locations, ordered by closest first. If you do not allow geolocation access, the list will be sorted alphabetically by location name.

## Demo

A live version can bee seen on github pages: https://haakemon.github.io/oslo-bysykkel-locations/

## Running the project

### Prerequisites
- [Node](https://nodejs.org/en/) 16.9.0 or later
- [Corepack](https://github.com/nodejs/corepack#-corepack) enabled (to enable, execute `corepack enable`)

### Starting devserver
- Execute `yarn` to install dependencies
- Execute `yarn start` to start the devserver. The port where the page can be reached should be displayed in the terminal.

### Running tests

Tests for larger interactive components are better suited to test with integration tests, using tools like Cypress. These types of tests are not added yet.

To run the unit tests with coverage information, execute `yarn test-coverage`.