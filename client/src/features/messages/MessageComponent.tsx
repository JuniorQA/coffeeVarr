import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { type RootState, useAppDispatch } from '../../store';
import type User from '../auth/User';

import type { Message } from './Message';
import { createMessage, loadMessages } from './MessageSlice';

function MessageComponent({ id }: { id: User['id'] }): JSX.Element {
  const dispatch = useAppDispatch();
  const CurrentBarista = useSelector((state: RootState) => state.barista.CurrentBarista);
  const CurrentCoffeeShop = useSelector((state: RootState) => state.coffeeShop.CurrentCoffeeShop);
  const User = useSelector((state: RootState) => state.auth.user);

  console.log(CurrentCoffeeShop, 'ЭТО CurrentCoffeeShop');
  console.log(CurrentBarista, 'ЭТО CurrentBarista');
  console.log(User, 'ЭТО User');

  const MessageList = useSelector((state: RootState) => state.message.MessageList);

  useEffect(() => {
    dispatch(loadMessages());
  }, [dispatch, CurrentBarista, CurrentCoffeeShop, User]);
  const [messageContent, setMessageContent] = useState('');

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>): void => {
    console.log('handleSendMessage start');
    e.preventDefault();
    const message: Message = {
      message: messageContent,
      senderId: User.id,
      receiverId: id,
    };

    dispatch(createMessage(message));
    setMessageContent('');

    console.log(CurrentBarista, 'ЭТО CurrentBarista');
  };

  return (
    <div>
      <h2>Сообщения:</h2>
      <ul>
        {MessageList.length > 0 ? (
          MessageList.map((m) => {
            if (m.senderId === User!.id && m.receiverId === +id) {
              console.log(User?.id, 'UUUUUUUUUUUSSSSEER IDDDDD');
              return <li key={m.id}>{m.message}</li>;
            }
          })
        ) : (
          <li>У Вас пока нету сообещний</li>
        )}
      </ul>
      <form onSubmit={handleSendMessage}>
        <textarea
          name="textarea"
          rows={5}
          cols={50}
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          placeholder="Comment text."
        />
        <button type="submit">Отправить сообщение</button>
      </form>
    </div>
  );
}

export default MessageComponent;
//