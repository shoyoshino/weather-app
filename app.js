window.addEventListener('load', () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');
  let degreeSection = document.querySelector('.degree-section');
  let degreeSpan = document.querySelector('.degree-section span');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lat = position.coords.latitude;
      long = position.coords.longitude;
      console.log(lat);
      console.log(long);

      // const api = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=apparent_temperature`;
      const api = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&timezone=Asia%2FTokyo&daily=temperature_2m_max&current_weather=true`;

      fetch(api)
        .then((response) => {
          console.log('response');
          return response.json();
        })
        .then((data) => {
          console.log('data');
          console.log(data);

          const temperature = data.current_weather.temperature;
          const wetherCode = data.current_weather.weathercode;
          const windSpeed = data.current_weather.windspeed;
          let icon = 'CLEAR_DAY';

          if (wetherCode === 0) {
            icon = 'CLEAR_DAY';
            temperatureDescription.textContent = `It's a nice sunny day.`;
          } else if (wetherCode === 1 || 2 || 3) {
            icon = 'PARTLY_CLOUDY_DAY';
            temperatureDescription.textContent = `Looks like a few clouds.`;
          } else if (wetherCode === 45 || 48) {
            icon = 'FOG';
            temperatureDescription.textContent = `Foggy. Please use caution when driving.`;
          } else if (
            wetherCode === 51 ||
            53 ||
            55 ||
            56 ||
            57 ||
            61 ||
            63 ||
            65 ||
            66 ||
            67 ||
            80 ||
            81 ||
            82 ||
            85 ||
            86 ||
            95
          ) {
            icon = 'RAIN';
            temperatureDescription.textContent = `The front is raining. Don't forget your umbrella.`;
          } else if (wetherCode === 71 || 73 || 75 || 77 || 96 || 99) {
            icon = 'SNOW';
            temperatureDescription.textContent = `Snow is falling. Put on your jacket.`;
          } else if (windSpeed >= 30) {
          }
          setIcons(icon, document.querySelector('.icon'));

          // Set DOM Elements from the API
          temperatureDegree.textContent = temperature;
          locationTimezone.textContent = data.timezone;
        });
    });
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: 'white' });
    const currentIcon = icon.replace(/-/g, '_').toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
