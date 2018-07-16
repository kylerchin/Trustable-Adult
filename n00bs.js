  const request = require('request');

  request('https://api.iextrading.com/1.0/stock/market/list/gainers', { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    console.log(body.url);
    console.log(body.explanation);

    console.log(body[0].symbol)
  });
