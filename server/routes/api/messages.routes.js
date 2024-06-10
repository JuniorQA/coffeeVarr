const router = require('express').Router();
// const { ValidationError, Sequelize } = require('sequelize');
const { Op } = require('sequelize');
const { User, Message, Barist, CoffeeShop } = require('../../db/models');

// роут достает свободные дни для баристы
router.get('/', async (req, res) => {
  const userId = res.locals.user?.id;
  try {
    const user = await User.findOne({
      where: { id: userId },
      include: [
        {
          model: Barist,
        },
        {
          model: CoffeeShop,
        },
        {
          model: Message,
          as: 'sentMessages', // Используйте алиас для отправленных сообщений
        },
        {
          model: Message,
          as: 'receivedMessages', // Используйте алиас для принятых сообщений
        },
      ],
    });

    // очищаем объект от метаданных
    const allMessages = await Message.findAll({
      where: {
        [Op.or]: [{ senderId: user.id }, { receiverId: user.id }],
      },
    });
    res.json(allMessages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// router.get('/', async (req, res) => {
//   const userId = res.locals.user?.id;
//   console.log(userId, 'THIS IS userId from RES.LOCALS');
//   try {
//     const user = await User.findOne({
//       where: { id: userId },
//       include: [
//         {
//           model: Barist,
//         },
//         {
//           model: CoffeeShop,
//         },
//         {
//           model: Message,
//           as: 'sentMessages', // Используйте алиас для отправленных сообщений
//         },
//         {
//           model: Message,
//           as: 'receivedMessages', // Используйте алиас для принятых сообщений
//         },
//       ],
//     });

//     console.log(user, 'THIS IS FOUND user from DB');
//     // очищаем объект от метаданных
//     const allMessages = await user.getSentMessages(); // Используйте метод, соответствующий алиасу
//     console.log(allMessages);
//     res.json(allMessages);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: error.message });
//   }
// });

// роут добавляет дату как свободную для бариста
router.post('/', async (req, res) => {
  const { message, senderId, receiverId } = req.body;
  //

  console.log(req.body, 'THIS IS REQ.BODY in CREATE FETCH');

  const userId = res.locals.user?.id;

  try {
    const user = await User.findOne({
      where: { id: userId },
      include: [
        {
          model: Barist,
        },
        {
          model: CoffeeShop,
        },
        {
          model: Message,
          as: 'sentMessages', // Используйте алиас для отправленных сообщений
        },
        {
          model: Message,
          as: 'receivedMessages', // Используйте алиас для принятых сообщений
        },
      ],
    });
    const newMessage = await Message.create({
      senderId: userId,
      receiverId,
      message,
    });
    if (user && newMessage) {
      return res.json(newMessage);
    }
    return res
      .status(400)
      .json({ message: 'Не получается отправить сообщение пользователю' });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const userId = res.locals.user?.id;
  try {
    const user = await User.findOne({
      where: { id: userId },
      include: [
        {
          model: Barist,
        },
        {
          model: CoffeeShop,
        },
        {
          model: Message,
          as: 'sentMessages', // Используйте алиас для отправленных сообщений
        },
        {
          model: Message,
          as: 'receivedMessages', // Используйте алиас для принятых сообщений
        },
      ],
    });
    if (user) {
      try {
        await Message.destroy({
          where: { id },
        });
        return res.sendStatus(204);
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
      }
    }

    return res.status(400).json({ message: 'Не получается удалить сообщение' });
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
