# WeatherApp Project by Pasquale Palena

Welcome to the Weather App project! This project is built using a modern and efficient tech stack to develop cross-platform mobile applications.

## Tech Stack

- TypeScript
- react-native-mmkv
- @reduxjs/toolkit
- redux-thunk
- redux-persist
- react-native-config
- react-native-get-location
- React Navigation v6.x
- react-native-reanimate

## Weather API
https://www.weatherapi.com/docs/

## Feature

- Get the current user location to determine the user's current location and fetch the API data based on the user's location.
- Allow users to select a custom location to view weather conditions based on their chosen location.
- Home Screen: Display relevant weather information.
- Forecast Screen: Display the next 5-day forecast based on the user's current location or custom location.

## Getting Started

### Prerequisites

- Node v16.

### Installation

1. `yarn install`
2. `npx pod-install`
3. `yarn run ios` or `yarn run android`

### env configuration
```
.env.development
WEATHER_ENDPOINT=https://api.weatherapi.com/v1
WEATHER_APIKEY=e083dac63e5a44c9b9a74155231407

```


