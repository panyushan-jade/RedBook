export const createLoginStore = (set) => ({
  userInfo: null,
  saveUserInfo: (data) => set(() => ({ userInfo: data })),
})