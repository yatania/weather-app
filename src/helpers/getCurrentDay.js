import moment from 'moment';

const getCurrentDay = (data, title) => ({
    date: moment(data.applicable_date).format().slice(0, 10),
    location: title,
    temperature: Math.round(data.the_temp),
    weatherIcon: `https://www.metaweather.com/static/img/weather/${data.weather_state_abbr}.svg`,
});

export default getCurrentDay;
