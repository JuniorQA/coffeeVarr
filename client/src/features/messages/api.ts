/* eslint-disable import/prefer-default-export */
import type { Message } from './Message';

export const createNewMessage = async (message: Message): Promise<Message> => {
  console.log(message, 'это консоль createNewMessage');
  const response = await fetch('/api/messages', {
    method: 'POST',
    body: JSON.stringify(message),
    headers: {
      'Content-type': 'application/json',
    },
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  }

  throw new Error(data.message);
};

export const loadAllMessages = async (): Promise<Message[]> => {
  const response = await fetch('/api/messages');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data = await response.json();
  console.log(data, 'это консоль loadAllMessages');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
  return data;
};

export const removeFromMessages = async (id: Message['id']): Promise<Message['id']> => {
  const response = await fetch(`/api/messages/${id}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    return id;
  }
  const data: { message: string } = await response.json();
  throw new Error(data.message);
};
