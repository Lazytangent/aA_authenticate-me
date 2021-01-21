const express = require('express');
const router = express.Router();

const apiRouter = require('./api');
router.use('/api', apiRouter);

if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  router.get('/', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.sendFile(

    )
  })
}

module.exports = router;
