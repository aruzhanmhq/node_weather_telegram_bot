const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios')

const token = '5349385005:AAGhDGHaX-aoRIq_R-TTFCH0vhQ1CxqfKFE';

const bot = new TelegramBot(token, {polling: true});

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  let cityName = msg.text;

  const options = {
    method: 'GET',
    url: 'https://community-open-weather-map.p.rapidapi.com/weather',
    params: {
      q: cityName,
      units: 'metric'
    },
    headers: {
      'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
      'X-RapidAPI-Key': '7d8d051dfdmsh5c0e5a1b489b621p1fb4a2jsn7ab693ce50da'
    }
  };

  const response = await axios.request(options)
  bot.sendMessage(chatId, `В ${msg.text} сейчас ${Math.round(response.data.main.temp)} градусов, ощущается как ${Math.round(response.data.main.feels_like)}. Скорость ветра ${response.data.wind.speed} м/c, давление ${response.data.main.pressure}`);
  console.log(msg.text)
});