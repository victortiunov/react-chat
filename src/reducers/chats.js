/* eslint no-use-before-define: 0 */
import { combineReducers } from 'redux';
import * as types from '../constants';

const initialState = {
  activeId: '',
  allIds: [],
  myIds: [],
  byIds: [],
};

const activeId = (state = initialState.activeId, action) => {
  switch (action.type) {
    case types.SET_ACTIVE_CHAT:
    case types.JOIN_CHAT_SUCCESS:
    case types.CREATE_CHAT_SUCCESS:
      return getChatId(action.payload.chat);
    case types.UNSET_ACTIVE_CHAT:
    case types.DELETE_CHAT_SUCCESS:
      return '';
    case types.RECIEVE_DELETED_CHAT:
      return state === getChatId(action.payload.chat) ? '' : state;

    default:
      return state;
  }
};

const allIds = (state = initialState.allIds, action) => {
  switch (action.type) {
    case types.FETCH_ALL_CHATS_SUCCESS:
      return action.payload.chats.map(getChatId);
    case types.RECIEVE_NEW_CHAT:
      return [...state, getChatId(action.payload.chat)];
    case types.DELETE_CHAT_SUCCESS:
    case types.RECIEVE_DELETED_CHAT:
      return state.filter(chatId => chatId !== getChatId(action.payload.chat));

    default:
      return state;
  }
};

const myIds = (state = initialState.myIds, action) => {
  switch (action.type) {
    case types.FETCH_MY_CHATS_SUCCESS:
      return action.payload.chats.map(getChatId);
    case types.CREATE_CHAT_SUCCESS:
    case types.JOIN_CHAT_SUCCESS:
      return [...state, getChatId(action.payload.chat)];
    case types.LEAVE_CHAT_SUCCESS:
    case types.DELETE_CHAT_SUCCESS:
    case types.RECIEVE_DELETED_CHAT:
      return state.filter(chatId => chatId !== getChatId(action.payload.chat));

    default:
      return state;
  }
};

const byIds = (state = initialState.byIds, action) => {
  switch (action.type) {
    case types.FETCH_ALL_CHATS_SUCCESS:
    case types.FETCH_MY_CHATS_SUCCESS:
      return {
        ...state,
        ...action.payload.chats.reduce(
          (ids, chat) => ({
            ...ids,
            // eslint-disable-next-line
            [chat._id]: {
              ...chat,
              unreadMessages: false,
            },
          }),
          {},
        ),
      };
    case types.FETCH_CHAT_SUCCESS:
    case types.CREATE_CHAT_SUCCESS:
    case types.LEAVE_CHAT_SUCCESS:
    case types.RECIEVE_NEW_CHAT: {
      return {
        ...state,
        [getChatId(action.payload.chat)]: {
          ...action.payload.chat,
          unreadMessages: false,
        },
      };
    }
    case types.DELETE_CHAT_SUCCESS:
    case types.RECIEVE_DELETED_CHAT: {
      const newState = { ...state };
      delete newState[getChatId(action.payload.chat)];
      return newState;
    }
    case types.RECIEVE_MESSAGE: {
      const { chatId } = action.payload;
      return {
        ...state,
        [chatId]: {
          ...state[chatId],
          unreadMessages: true,
        },
      };
    }

    default:
      return state;
  }
};

export default combineReducers({
  activeId,
  allIds,
  myIds,
  byIds,
});

// eslint-disable-next-line
export const getChatId = chat => chat._id;
export const getByIds = (state, ids) => ids.map(id => state.byIds[id]);
export const getById = (state, id) => state.byIds[id];
export const getActiveChatId = state => state.activeId;
