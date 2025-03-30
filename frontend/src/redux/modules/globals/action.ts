const SET_TOKEN = 'SET_TOKEN';
const SET_LANGUAGE = 'SET_LANGUAGE';

// 设置Token
export const setToken = (token: string) => ({
  type: SET_TOKEN,
  token,
});

// 设置语言
export const setLanguage = (language: string) => ({
  type: SET_LANGUAGE,
  language,
});
