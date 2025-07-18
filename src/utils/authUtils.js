// utils/authUtils.js
import { getFromLocalStorage, saveToLocalStorage } from './localStorageUtils';

const USERS_KEY = 'palette_peek_users';
const CURRENT_USER_KEY = 'palette_peek_current_user';

export const registerUser = (email, password) => {
  let users = getFromLocalStorage(USERS_KEY, []);
  if (users.find(user => user.email === email)) {
    return { success: false, message: 'User with this email already exists.' };
  }
  const newUser = { email, password }; // In a real app, hash the password!
  users.push(newUser);
  saveToLocalStorage(USERS_KEY, users);
  return { success: true, message: 'Registration successful!' };
};

export const loginUser = (email, password) => {
  const users = getFromLocalStorage(USERS_KEY, []);
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    saveToLocalStorage(CURRENT_USER_KEY, user.email);
    return { success: true, message: 'Login successful!', userEmail: user.email };
  }
  return { success: false, message: 'Invalid email or password.' };
};

export const logoutUser = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

export const getCurrentUserEmail = () => {
  return getFromLocalStorage(CURRENT_USER_KEY, null);
};