/* eslint-disable max-len */
import upload from '../../utils/uploadMulter.js';
const router = require('express').Router();
// const upload = require('../../utils/uploadMulter.mjs');

const { CoffeeShop } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    // проверить, есть ли такой юзер в бд
    const users = await CoffeeShop.findAll();
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

router.get('/getCoffeeShopUser', async (req, res) => {
  try {
    // проверить, есть ли такой юзер в бд
    const coffeeShopId = res.locals.user?.shopId;
    const coffeeShop = await CoffeeShop.findByPk(coffeeShopId);
    if (!coffeeShop) {
      return res.status(404).json({
        success: false,
        message: 'Извините не правильный запрос',
      });
    }
    // отправляем ответ
    return res.json(coffeeShop);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await CoffeeShop.update(req.body, {
      where: { id },
      returning: true, // если нужно, чтобы вернулась сущность, которая изменилась
    });
    if (updated[0] > 0) {
      return res.json(updated);
      // return res.json(updated[1])// вернется массив измененных сущностей
    }
    return res.status(400).json({ message: 'Cannot be updated' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post('/upload-photo', upload.single('photo'), async (req, res) => {
  const userId = res.locals.user?.shopId;
  try {
    // Обработка загруженного файла
    const uploadedFile = req.file;
    const filePath = uploadedFile.path.replace('public', '');

    const user = await CoffeeShop.findByPk(userId);
    user.photo = filePath;
    await user.save();

    delete user.password; //  чтобы не отправлять пароль на клиент

    res.json(user);
  } catch (error) {
    console.error('Ошибка при обработке запроса:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

module.exports = router;
