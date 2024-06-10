const router = require('express').Router();
const { ValidationError } = require('sequelize');
const { Barist, CoffeeShop } = require('../../db/models');

// роут достает избранные баристы кофешопа
router.get('/', async (req, res) => {
  const coffeeShopId = res.locals.user?.shopId;
  try {
    const coffeeShop = await CoffeeShop.findOne({
      include: {
        model: Barist,
        as: 'FavoriteBaristas',
        through: {
          attributes: [],
        },
      },
      where: { id: coffeeShopId },
    });

    // очищаем объект от метаданных
    const favorites = coffeeShop.FavoriteBaristas.map((v) => v.toJSON());
    res.json(favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});
// роут добавляет баристу в избранные кофешопа
router.post('/', async (req, res) => {
  const { baristaId } = req.body;

  const coffeeShopId = res.locals.user?.shopId;
  try {
    // const user = await User.findOne({ where: { id: userId } });
    const coffeeShop = await CoffeeShop.findByPk(coffeeShopId);
    const barista = await Barist.findByPk(baristaId);
    if (barista && coffeeShop) {
      await coffeeShop.addFavoriteBaristas(barista); //  метод по названию alias в модели user

      return res.json(barista);
    }
    return res.status(400).json({ message: 'Не получается сохранить в избранное' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const coffeeShopId = res.locals.user?.shopId;
  try {
    const user = await CoffeeShop.findOne({ where: { id: coffeeShopId } });
    const item = await Barist.findOne({
      where: { id },
    });

    if (item) {
      await user.removeFavoriteBaristas(item); //  метод по названию alias в модели user
      return res.sendStatus(204);
    }
    return res
      .status(400)
      .json({ message: 'Не получилось удалить с избранного' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
