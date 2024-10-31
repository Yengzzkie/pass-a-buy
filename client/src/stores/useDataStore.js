import { create } from "zustand";

export const useUserData = create((set) => ({
    userData: {},
    setUserData: (data) => set({ userData: data })
}));

export const useUserCredentials = create((set) => ({
    loginStatus: null,
    setLoginStatus: (status) => set({ loginStatus: status })
}));

export const usePostData = create((set) => ({
    postData: [],
    setPostData: (posts) => set({ postData: posts })
}));
