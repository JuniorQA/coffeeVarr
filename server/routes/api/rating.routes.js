const router = require('express').Router();
const { User } = require('../../db/models');

router.post('/', async (req, res) => {
  const { baristaId, userId, newRating } = req.body;
  try {
    return res.json({ baristaId, userId, newRating });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});
module.exports = router;
