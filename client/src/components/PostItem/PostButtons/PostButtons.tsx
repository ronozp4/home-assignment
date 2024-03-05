import React from 'react'
import "./styles.css";
import { useAuth } from '../../../context/AuthContext';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { PostData } from '../../../types';
import { deletePostApi, editPostApi } from '../../../api/posts';
import { usePosts } from '../../../context/PostsContext';

type PostButtonsProps = {
    post: PostData
    openEditor: () => void
};

const PostButtons: React.FC<PostButtonsProps> = ({ post, openEditor }) => {
    const { user, allUsers } = useAuth()
    const { deletePost, likePost } = usePosts()

    const handlePostDelete = () => {
        if(!confirm('Do you sure you want to delete this post?')) return
        deletePost(post.id)
        deletePostApi(post.id)
    }
    const handleLike = () => {
        const newPost = likePost(post, user.id)
        editPostApi(newPost)
    }

    const getLikeNameList = () => {
        const usersNames = post.likes.map(userLikedId => allUsers?.find(user=> user.id === userLikedId)?.name)
        return usersNames.join(', ')
    }

    return (
        <div className='post-buttons-container'>
            {user.id === post.userId ? <div className='post-buttons-edit'>
                <div className='icons' onClick={handlePostDelete}>
                    <DeleteIcon style={{ color: 'grey' }} />
                </div>
                <div className='icons' onClick={openEditor}>
                    <EditIcon style={{ color: 'grey' }} />
                </div>
            </div> : <div />}
            <div className='like-wrapper'>
                <div className='counter'>{post?.likes?.length || 0}</div>
                <div className='icons' title={post?.likes?.length ? getLikeNameList() : ''} onClick={handleLike}>
                    <ThumbUpIcon className='thumbUpIcon' />
                </div>
            </div>

        </div>
    )
}

export default PostButtons