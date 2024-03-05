import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { PostData } from '../types';

interface PostsContextProps {
  allPosts: PostData[];
  postEdit: PostData | null;
  editPost: (post: PostData) => void;
  setPostEdit: (post: PostData | null) => void;
  addPost: (post: PostData) => void;
  allPostsInit: (posts: PostData[]) => void;
  deletePost: (id: number) => void;
  likePost: (post: PostData, userId: number) => PostData;
}

const PostsContext = createContext<PostsContextProps | undefined>(undefined);

export const usePosts = () => {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const PostsProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [allPosts, setAllPosts] = useState<PostData[]>([]);
  const [postEdit, setPostEdit] = useState<PostData | null>(null)

 
    const deletePost = (id: number)=> {
        if(!allPosts) return
        const filteredPosts = allPosts.filter((p: PostData)=>p.id !== id)
        setAllPosts([...filteredPosts])
    }

    const addPost = (post: PostData) => {
        setAllPosts([post, ...allPosts ])
    }

    const allPostsInit = (posts: PostData[]) => {
        setAllPosts(posts)
    }
 
    const editPost = (post: PostData ) => {
        const filteredPosts = allPosts.filter((p: PostData)=>p.id !== post.id)
        setAllPosts([post, ...filteredPosts ]) // date is current date so push to top
    }

    const likePost = (post: PostData, userId: number) => {
        const likedIndex = post.likes.findIndex((userLiked: number) => userLiked === userId)
        if(likedIndex < 0){ // add like
            post.likes.push(userId)
        }else { //remove like
            post.likes = post.likes.filter((userLiked: number)=>userLiked !== userId)
        }
        const postIndex = allPosts.findIndex((p: PostData)=>p.id === post.id)
        allPosts[postIndex] = post
        setAllPosts([...allPosts])
        return post
    }

  return (
    <PostsContext.Provider value={{ postEdit, allPosts, deletePost, addPost, allPostsInit, setPostEdit, editPost, likePost }}>
      {children}
    </PostsContext.Provider>
  );
};
