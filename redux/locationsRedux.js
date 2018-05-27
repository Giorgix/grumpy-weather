// The types of actions that you can dispatch to
// modify the state of the store
export const TYPES = {
  ADD_LOCATION: 'ADD_LOCATION',
  REMOVE_LOCATION: 'REMOVE_LOCATION',
  CHANGE_TEMPERATURE: 'CHANGE_TEMPERATURE',
  CHANGE_LOCATION: 'CHANGE_LOCATION',
  SET_WEATHER: 'SET_WEATHER',
}

// Helper functions to dispatch actions, optionally with payloads
export const actionCreators = {
  addLocation: (location) => {
    return {type: TYPES.ADD_LOCATION, payload: location}
  },
  removeLocation: (index) => {
    return {type: TYPES.REMOVE_LOCATION, payload: index}
  },
  changeTemperature: (unit) => {
    return {type: TYPES.CHANGE_TEMPERATURE, payload: unit}
  },
  changeLocation: (index) => {
    return {type: TYPES.CHANGE_LOCATION, payload: index}
  },
  setWeather: (weather) => {
    return {type: TYPES.SET_WEATHER, payload}
  },
}

// Initial state of the store
const initialState = {
  locations: [
    {
      name: 'Madrid',
      country: 'Spain',
      admin1: 'Madrid',
      lat: 40.4165,
      lon: -3.70256,
      updatedAt: new Date(),
      weather: {
        "title": "Conditions for Madrid, Madrid, ES at 06:00 PM CEST",
        "lat": "40.40871",
        "long": "-3.69241",
        "link": "http://us.rd.yahoo.com/dailynews/rss/weather/Country__Country/*https://weather.yahoo.com/country/state/city-56462008/",
        "pubDate": "Fri, 25 May 2018 06:00 PM CEST",
        "condition": {
            "code": "30",
            "date": "Fri, 25 May 2018 06:00 PM CEST",
            "temp": "66",
            "text": "Partly Cloudy"
        },
      },
    },
    {
      name: 'Queens',
      country: 'United States',
      admin1: 'New York',
      lat: 40.681499,
      lon: -73.836502,
      updatedAt: new Date(),
      weather: {
        "title": "Conditions for New York, NY, US at 01:00 PM EDT",
        "lat": "40.681931",
        "long": "-73.836906",
        "link": "http://us.rd.yahoo.com/dailynews/rss/weather/Country__Country/*https://weather.yahoo.com/country/state/city-23683025/",
        "pubDate": "Fri, 25 May 2018 01:00 PM EDT",
        "condition": {
            "code": "30",
            "date": "Fri, 25 May 2018 01:00 PM EDT",
            "temp": "85",
            "text": "Partly Cloudy"
        },
      },
    },
  ],
  selectedLocation: 0,
  tempUnit: 'F'
}

// Function to handle actions and update the state of the store.
// Notes:
// - The reducer must return a new state object. It must never modify
//   the state object. State objects should be treated as immutable.
// - We set \`state\` to our \`initialState\` by default. Redux will
//   call reducer() with no state on startup, and we are expected to
//   return the initial state of the app in this case.

export const reducer = (state = initialState, action) => {
  const {type, payload} = action
  const {locations, tempUnit} = state
  switch (type) {
    case TYPES.ADD_LOCATION: {
      return {
        ...state,
        locations: [payload, ...locations]
      }
    }
    case TYPES.REMOVE_LOCATION: {
      return {
        ...state,
        locations: locations.filter((location, i) => i !== payload),
      }
    }
    case TYPES.CHANGE_TEMPERATURE: {
      return {
        ...state,
        tempUnit: payload,
      }
    }
    case TYPES.CHANGE_LOCATION: {
      return {
        ...state,
        selectedLocation: payload,
      }
    }
    default: {
      return state
    }
  }
}
