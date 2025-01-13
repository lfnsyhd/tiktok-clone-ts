import { create } from 'zustand';
import { persist, devtools, createJSONStorage } from 'zustand/middleware';
import { Post, PostWithProfile } from '../types';
import useGetAllPosts from '../hooks/useGetAllPosts';
import useGetPostsByUser from '../hooks/useGetPostsByUserId';
import useGetPostById from '../hooks/useGetPostById';
import useGetPostsByExplore from '../hooks/useGetPostExplore';
  
interface PostStore {
    allPosts: PostWithProfile[];
    postsByUser: Post[];
    postById: PostWithProfile | null;
    explorePosts: Post[];
    setAllPosts: () => void;
    setPostsByUser: (userId: string) => void;
    setPostById: (postId: string) => void;
    setExplorePosts: (id: string) => void;
}

export const usePostStore = create<PostStore>()( 
    devtools(
        persist(
            (set) => ({
                allPosts: [],
                postsByUser: [],
                postById: null,
                explorePosts: [],

                setAllPosts: async () => {
                    const result = await useGetAllPosts();
                    set({ allPosts: result });
                },
                setPostsByUser: async (userId: string) => {
                    const result = await useGetPostsByUser(userId);
                    set({ postsByUser: result });
                },
                setPostById: async (postId: string) => {
                    const result = await useGetPostById(postId);
                    set({ postById: result });
                },

                setExplorePosts: async (postId: string) => {
                    const result = await useGetPostsByExplore(postId);
                    set({ explorePosts: result });
                },
            }),
            { 
                name: 'store', 
                storage: createJSONStorage(() => localStorage) 
            }
        )
    )
)