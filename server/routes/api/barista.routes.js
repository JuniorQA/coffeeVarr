/* eslint-disable max-len */

const router = require('express').Router();
const bcrypt = require('bcrypt');
const upload = require('../../utils/uploadMulter');

const {
  User,
  Barist,
  FreeDate,
  CoffeeShop,
  BaristasFreeDate,
  IndividualUser,
} = require('../../db/models');
// const generateTokens = require('../../utils/authUtils');
// const jwtConfig = require('../../config/jwtConfig');

// аутентицикация существующего пользователя
router.get('/', async (req, res) => {
  try {
    console.log('KOLYAN');
    // проверить, есть ли такой юзер в бд
    const users = await Barist.findAll({
      include: [
        {
          model: FreeDate,
          through: BaristasFreeDate,
          as: 'FreeDateBaristas', // алиас для связанной моделиииииии
        },
      ],
    });
    if (!users) {
      return res.status(404).json({
        success: false,
        message: 'Извините не правильный запрос',
      });
    }
    // отправляем ответ
    return res.json({
      success: true,
      user: users,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // проверить, есть ли такой юзер в бд
    const user = await Barist.findOne({ where: { userId: +id } });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Извините не правильный запрос',
      });
    }
    // отправляем ответ
    return res.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/upload-photo', upload.single('photo'), async (req, res) => {
  const userId = res.locals.user?.baristaId;
  try {
    // Обработка загруженного файла
    const uploadedFile = req.file;
    const filePath = uploadedFile.path.replace('public', '');

    const user = await Barist.findByPk(userId);
    user.photo = filePath;
    await user.save();

    delete user.password; //  чтобы не отправлять пароль на клиент

    res.json(user);
  } catch (error) {
    console.error('Ошибка при обработке запроса:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  console.log(12312);
  console.log(req.body, '<><><>');
  try {
    const updated = await Barist.update(req.body, {
      where: { id },
      returning: true, // если нужно, чтобы вернулась сущность, которая изменилась
    });
    console.log(updated);
    if (updated[0] > 0) {
      return res.json(updated);
      // return res.json(updated[1])// вернется массив измененных сущностей
    }
    return res.status(400).json({ message: 'Cannot be updated' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
