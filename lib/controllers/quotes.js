const { Router } = require('express');
const fetch = require('cross-fetch');

module.exports = Router().get('/', (req, res, next) => {
  const arr = [
    'https://programming-quotes-api.herokuapp.com/quotes/random',
    'https://futuramaapi.herokuapp.com/api/quotes/1',
    'https://api.quotable.io/random',
  ];
  const arrQuote = [];
  // console.log('we are able to hit quotes');

  function getAllPromises() {
    return Promise.all(arr.map((fetchGet) => fetch(fetchGet))).then(
      (promiseArr) => {
        // console.log('promiseArr :>> ', promiseArr.json());
        return Promise.all(
          promiseArr.map((quotePromise) => quotePromise.json())
        );
      }
    );
  }
  getAllPromises()
    .then((data) => {
      // console.log('data :>> ', data);
      arrQuote.push(data[0]);
      arrQuote.push(data[1][0]);
      arrQuote.push(data[2]);
      // console.log('arrQuote', arrQuote);
      const dataMunge = arrQuote.map((quoteData) => {
        return {
          author: quoteData.author || quoteData.character,
          content: quoteData.en || quoteData.quote || quoteData.content
        };
      });
      res.json(dataMunge);
    })
    .catch(next);
  //  arr.forEach((fetchGet) => {
  //   fetch(fetchGet).then((data) => {
  //     arrQuote.push(data);
  //     console.log('arrQuote :>> ', arrQuote);
  //     Promise.all(arrQuote);
  //   });
  // });
  //  res.json(arrQuote);
  //  return fetch('https://programming-quotes-api.herokuapp.com/quotes/random').then((quote) => {
  //   //  console.log('quote :>> ', quote);
  //   arr.push(quote)
  //  })
});
