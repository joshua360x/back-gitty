const { Router } = require('express');

module.exports = Router().get('/', async (req, res) => {
  res.json({
    message: 'Congrats you made it',
  });
});
