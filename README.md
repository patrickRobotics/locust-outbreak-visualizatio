# Locust-outbreak-visualization application
There has been a desert locust infestation affecting a large portion of farmland in Ethiopia. During collection of yield data, some employees have observed the outbreak and are able to inform us of specific sightings of locusts. However, the overall impact on the farmland is unknown, and can only be estimated using simulations that take into account the known sightings and the predominant wind direction.

This is a web-based simulation that can review the captured farm data and visualise the overall impact.


## Assumptions this simulation make are:
1. All farms are of equal size, and form an even grid
    - The first farm in the North-West corner can be identified with the coordinates (0,0)
    - The farm directly to the south of the first farm is (1,0)
    - The farm directly to the east of the first farm is (0,1)
    - A farm that is 5 steps south and 2 steps east of the first farm would be (5,2)
2. Wind blows in one of the cardinal directions: North, East, South or West
3. If there is a reported locust outbreak in a given farm, the impact on yields is 80%
4. Farms which neighbour the reported outbreaks are likely to also be affected. Given a known outbreak, the probability of there being a locust outbreak in the neighbouring farm (and therefore the expected impact on yields) is:
    - 50% if the neighbouring farm is in the direction of the wind
    - 25% for all other directly neighbouring farms to the North, South, East or West
5. Farms that have no reported outbreaks and do not neighbour affected farms can be assumed to have 0% impact
6. The overall impact on the entire farmland is the average of the impacts on each farm

## Requirements
The simulation should read data from URLs submited, where each URLs has a JSON payload that states:
-   The size of the farm grid
-   The predominant wind direction
-   The coordinates of confirmed locust outbreaks

e.g. https://run.mocky.io/v3/efc06fd8-cef1-4da6-b77f-9c03d3bb0eae

This browser-based simulator allows the user to enter one of the above data URLs and run a simulation. The simulator fetches the JSON from the specified URL and performs the relevant simulation.


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

