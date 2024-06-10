const router = require('express').Router();
// const { ValidationError, Sequelize } = require('sequelize');
const {
  Barist,
  FreeDate,
  // BaristasFreeDate,
  // sequelize,
} = require('../../db/models');

// роут достает свободные дни для баристы
router.get('/', async (req, res) => {
  const baristaId = res.locals.user?.baristaId;
  try {
    const barista = await Barist.findOne({
      include: {
        model: FreeDate,
        as: 'FreeDateBaristas',
        through: {
          attributes: [],
        },
      },
      where: { id: baristaId },
    });

    // очищаем объект от метаданных
    const freeDates = barista.FreeDateBaristas.map((d) => d.toJSON());
    res.json(freeDates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});
// роут добавляет дату как свободную для бариста
router.post('/', async (req, res) => {
  const { freeDate } = req.body;

  const baristaId = res.locals.user?.baristaId;

  try {
    const barista = await Barist.findByPk(baristaId);
    const freedate = await FreeDate.create({ Date: freeDate });
    if (barista && freedate) {
      await barista.addFreeDateBaristas(freedate); //  метод по названию alias в модели user

      return res.json(freedate);
    }
    return res.status(400).json({ message: 'Не получается добавить дату' });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const baristaId = res.locals.user?.baristaId;
  try {
    const barista = await Barist.findOne({ where: { id: baristaId } });
    if (barista) {
      try {
        await FreeDate.destroy({
          where: { id },
        });
        return res.sendStatus(204);
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
      }
    }

    return res.status(400).json({ message: 'Не получается удалить дату' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

// if (freeDate) {
//   await barista.removeFreeDateBaristas(freeDate);
//   const deleted = await FreeDate.destroy({
//     where: { id },
//   });
//   // await transaction.commit();
//   return res.send(204).json(freeDate);
// }
