const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth.js');
const { User } = require('../../db/models');

router.post('/test/', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
