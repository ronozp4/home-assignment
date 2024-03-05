import React from 'react'
import { PostData } from '../../types';
import "./styles.css";
import PostHeader from './PostHeader/PostHeader';
import PostButtons from './PostButtons/PostButtons';
import { usePosts } from '../../context/PostsContext';

type PostItemProps = {
    post: PostData
    openEditor: () => void
  };
  

const PostItem: React.FC<PostItemProps> = ({post, openEditor}) => {
    const { setPostEdit } = usePosts()
    const handleEditPost = () => {
        setPostEdit(post)
        openEditor()
    }
  return (
    <div className='post-container'>
        <PostHeader userId={post.userId} date={post.date} />
        <img src={post.imageUrl} />
        {post.content}
        <PostButtons openEditor={handleEditPost} post={post} />
    </div>
  )
}

export default PostItem