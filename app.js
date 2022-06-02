const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios')

const token = '';

const bot = new TelegramBot(token, {polling: true});

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    let cityName = msg.text;
    // if(msg.text.includes('иди')){
    //     bot.sendMessage(chatId, 'Сам иди');
    // }else{
    //     bot.sendMessage(chatId, 'Привет');
    // }

    // const OPEN_WEATHER_MAP_URL = 'https://community-open-weather-map.p.rapidapi.com/weather';
    // const OPEN_WEATHER_MAP_HEADERS = {
    //     'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
    //     'X-RapidAPI-Key': '7d8d051dfdmsh5c0e5a1b489b621p1fb4a2jsn7ab693ce50da'
    // }

    // let response = await axios.get(OPEN_WEATHER_MAP_URL, {q: cityName}, OPEN_WEATHER_MAP_HEADERS);
    // console.log(response)

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
    //   console.log(response.data)
      bot.sendMessage(chatId, `В ${msg.text} сейчас ${Math.round(response.data.main.temp)} градусов`);
      console.log(msg.text)
      

  });