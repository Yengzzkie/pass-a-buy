import { create } from "zustand";

const useDataStore = create((set) => ({
    userData: null,
    setUserData: (data) => set({ userData: data }),

    loginStatus: false,
    setLoginStatus: (isLoggedIn) => set({ loginStatus: isLoggedIn }),

    postData: null,
    setPostData: (data) => set({ postData: data })
}))

export default useDataStore;