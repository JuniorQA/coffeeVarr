/* eslint-disable max-len */
const router = require('express').Router();
const bcrypt = require('bcrypt');

const { User, Barist, CoffeeShop, IndividualUser } = require('../../db/models');
const generateTokens = require('../../utils/authUtils');
const jwtConfig = require('../../config/jwtConfig');

// аутентицикация существующего пользователя
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // проверить, есть ли такой юзер в бд
    const user = await User.findOne({
      where: { email },
      // nest: true,
      include: [
        {
          model: CoffeeShop,
        },
        {
          model: Barist,
        },
        {
          model: IndividualUser,
        },
      ],
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Нет такого пользователя',
      });
    }

    //  проверить пароли
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res.status(403).json({
        success: false,
        message: 'Неправильный пароль',
      });
    }

    let userData;

    if (user.role === 'individualUser') {
      userData = {
        id: user.id,
        role: user.role,
        email: user.email,
        individualUserId: user.IndividualUser.id,
        firstName: user.IndividualUser.firstName,
        secondName: user.IndividualUser.secondName,
        photoUser: user.IndividualUser.photo,
      };
    } else if (user.role === 'barista') {
      userData = {
        id: user.id,
        role: user.role,
        email: user.email,
        baristaId: user.Barist.id,
        baristaFirstName: user.Barist.baristaFirstName,
        baristaLastName: user.Barist.baristaLastName,
        photoBarista: user.Barist.photo,
        age: user.Barist.age,
        gender: user.Barist.gender,
        experience: user.Barist.experience,
        skills: user.Barist.skills,
        rating: user.Barist.rating,
      };
    } else if (user.role === 'coffeeShop') {
      userData = {
        id: user.id,
        role: user.role,
        email: user.email,
        shopId: user.CoffeeShop.id,
        shopName: user.CoffeeShop.shopName,
        photoCoffeeShop: user.CoffeeShop.photo,
      };
    }
    // сгенерируем jwt токены
    const { accessToken, refreshToken } = generateTokens({
      user: userData,
    });

    // устанавливаем куки
    res.cookie(jwtConfig.access.type, accessToken, {
      maxAge: jwtConfig.access.expiresIn,
      httpOnly: true,
    });
    res.cookie(jwtConfig.refresh.type, refreshToken, {
      maxAge: jwtConfig.refresh.expiresIn,
      httpOnly: true,
    });

    // отправляем ответ
    return res.json({
      success: true,
      user: userData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

// создание нового пользователя
router.post('/register', async (req, res) => {
  try {
    const { role, email, password } = req.body;
    if (role === '' || email === '' || password === '') {
      res.status(400).json({ success: false, message: 'Заполните все поля' });
    }

    // если пользователь с таким email уже есть, возвращаем ошибку
    const foundUser = await User.findOne({ where: { email } });
    if (foundUser) {
      return res
        .status(400)
        .json({ success: false, message: 'Такой пользователь уже существует' });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ role, email, password: hash });

    const userData = { id: user.id, role: user.role, email: user.email };

    return res.json({
      success: true,
      user: userData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/register/barista', async (req, res) => {
  const { baristaFirstName, baristaLastName, age, gender, experience, userId } =
    req.body;
  if (
    baristaFirstName === '' ||
    baristaLastName === '' ||
    age === '' ||
    gender === '' ||
    experience === ''
  ) {
    res.status(400).json({ success: false, message: 'Заполните все поля' });
  }

  try {
    // находим глобального юзера чтобы по айДИ который получили в рек. бади и к этому юзеру привязать созданный профиль
    const foundUser = await User.findOne({ where: { id: userId } });

    const barista = await Barist.create({
      baristaFirstName,
      baristaLastName,
      age,
      gender,
      experience,
      userId: foundUser.id,
    });

    const baristaData = {
      id: barista.id,
      baristaFirstName: barista.baristaFirstName,
      baristaLastName: barista.baristaLastName,
      age: barista.age,
      gender: barista.gender,
      photo: barista.photo,
      experience: barista.experience,
      userId: barista.userId,
      rating: barista.rating,
    };

    return res.json({
      success: true,
      user: baristaData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/register/coffeeShop', async (req, res) => {
  const { shopName, address, userId } = req.body;

  if (shopName === '' || address === '') {
    res.status(400).json({ success: false, message: 'Заполните все поля' });
  }

  try {
    // находим глобального юзера чтобы по айДИ который получили в рек. бади и к этому юзеру привязать созданный профиль
    const foundUser = await User.findOne({ where: { id: userId } });

    const coffeeShop = await CoffeeShop.create({
      shopName,
      address,
      userId: foundUser.id,
    });

    const coffeeShopData = {
      id: coffeeShop.id,
      coffeeShopName: coffeeShop.coffeeShopName,
      photo: coffeeShop.photo,
      city: coffeeShop.city,
      address: coffeeShop.address,
      userId: coffeeShop.userId,
      rating: coffeeShop.rating,
    };

    return res.json({
      success: true,
      user: coffeeShopData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/register/individualUser', async (req, res) => {
  const { firstName, lastName, userId } = req.body;

  if (firstName === '' || lastName === '') {
    res.status(400).json({ success: false, message: 'Заполните все поля' });
  }

  try {
    // находим глобального юзера чтобы по айДИ который получили в рек. бади и к этому юзеру привязать созданный профиль
    const foundUser = await User.findOne({ where: { id: userId } });

    const individualUser = await IndividualUser.create({
      firstName,
      lastName,
      userId: foundUser.id,
    });

    const individualUserData = {
      id: individualUser.id,
      firstName: individualUser.firstName,
      lastName: individualUser.lastName,
      photo: individualUser.photo,
      userId: individualUser.userId,
    };

    return res.json({
      success: true,
      user: individualUserData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

// при логауте чистим все куки
router.get('/logout', (req, res) => {
  try {
    res.clearCookie(jwtConfig.access.type).clearCookie(jwtConfig.refresh.type);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// проверка активной сессии и отправка информации о пользователе
router.get('/check', (req, res) => {
  if (res.locals.user) {
    res.json({ message: 'success', user: res.locals.user });
  } else {
    res.status(401).json({ message: 'Пользователь не аутентифицирован' });
  }
});
module.exports = router;
