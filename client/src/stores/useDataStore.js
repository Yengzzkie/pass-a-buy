import { create } from "zustand";

export const useUserData = create((set) => ({
    userData: {},
    setUserData: (data) => set({ userData: data })
}));

export const useUserID = create((set) => ({
    userId: JSON.parse(localStorage.getItem("userID")) || null,
    setUserId: (id) => set({ userId: id })
}));

export const useUserAuth = create((set) => ({
    // initial loginStatus will be synced from the localStorage instead of just setting it to null,
    // I find this efficient especially for Navbar's conditional rendering if a user is logged in or not
    auth: JSON.parse(localStorage.getItem("auth")) || false,
    setAuth: (auth) => set({ auth: auth })
}));

export const usePostData = create((set) => ({
    postData: [],
    setPostData: (posts) => set({ postData: posts })
}));

export const useUserPostsData = create((set) => ({
    posts: [],
    setPosts: (post) => set({ posts: post })
}))

export const useModal = create((set) => ({
    isModal: false,
    setIsModal: (modal) => set({ isModal: !modal })
}));