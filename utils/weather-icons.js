// NOTE codes from: https://developer.yahoo.com/weather/documentation.html#item
 const iconByCondition = {
  0: "",	// tornado
  1: "ios-thunderstorm",	// tropical storm
  2: "",	// hurricane
  3: "ios-thunderstorm",	// severe thunderstorms
  4: "ios-thunderstorm",	// thunderstorms
  5: "",	// mixed rain and snow
  6: "",	// mixed rain and sleet
  7: "",	// mixed snow and sleet
  8: "",	// freezing drizzle
  9: "",	// drizzle
  10: "ios-rainy",	// freezing rain
  11: "ios-rainy",	// showers
  12: "ios-rainy",	// showers
  13: "ios-snow",	// snow flurries
  14: "",	// light snow showers
  15: "",	// blowing snow
  16: "ios-snow",	// snow
  17: "",	// hail
  18: "",	// sleet
  19: "",	// dust
  20: "",	// foggy
  21: "",	// haze
  22: "",	// smoky
  23: "",	// blustery
  24: "",	// windy
  25: "",	// cold
  26: "ios-cloudy",	// cloudy
  27: "ios-cloudy-night",	// mostly cloudy (night)
  28: "md-cloudy",	// mostly cloudy (day)
  29: "ios-cloudy-night",	// partly cloudy (night)
  30: "ios-partly-sunny",	// partly cloudy (day)
  31: "ios-moon",	// clear (night)
  32: "ios-sunny",	// sunny
  33: "",	// fair (night)
  34: "ios-sunny",	// fair (day)
  35: "",	// mixed rain and hail
  36: "ios-sunny",	// hot
  37: "ios-thunderstorm",	// isolated thunderstorms
  38: "ios-thunderstorm",	// scattered thunderstorms
  39: "ios-thunderstorm",	// scattered thunderstorms
  40: "ios-rainy",	// scattered showers
  41: "ios-snow",	// heavy snow
  42: "",	// scattered snow showers
  43: "ios-snow",	// heavy snow
  44: "",	// partly cloudy
  45: "",	// thundershowers
  46: "",	// snow showers
  47: "ios-thunderstorm",	// isolated thundershowers
  3200: "",	// not available
}

const getWeatherIcon = (condition_code) => {
  if (iconByCondition[condition_code] ) {
    return iconByCondition[condition_code]
  }
  return 'ios-partly-sunny';
}

export default getWeatherIcon
