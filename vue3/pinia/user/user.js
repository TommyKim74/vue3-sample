// stores/user.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: null,
  }),
  actions: {
    setUserInfo(user) {
      this.userInfo = user;
    },
    clearUserInfo() {
      this.userInfo = null;
    },
  },
});