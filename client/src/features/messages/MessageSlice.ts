/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from './api';
import type MessageState from './MessageState';
import type { Message } from './Message';

const initialState: MessageState = {
  MessageList: [],
};

export const loadMessages = createAsyncThunk('messages/load', () => api.loadAllMessages());

export const createMessage = createAsyncThunk('messages/create', (message: Message) =>
  api.createNewMessage(message),
);

export const removeMessage = createAsyncThunk('messages/remove', (id: Message['id']) =>
  api.removeFromMessages(id),
);

const MessageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadMessages.fulfilled, (state, action) => {
      state.MessageList = action.payload;
    });
    builder.addCase(createMessage.fulfilled, (state, action) => {
      state.MessageList.push(action.payload);
    });
    builder.addCase(removeMessage.fulfilled, (state, action) => {
      state.MessageList = state.MessageList.filter((m) => m.id !== action.payload);
    });
  },
});
export default MessageSlice.reducer;
