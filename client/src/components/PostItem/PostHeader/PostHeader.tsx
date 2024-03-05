import React from 'react'
import "./styles.css";
import { UserAvatar } from '../..';
import { useAuth } from '../../../context/AuthContext';
import { dateFromat } from '../../../utils/tools';

type PostHeaderProps = {
    userId: number
    date: string
};
  
const PostHeader: React.FC<PostHeaderProps> = ({userId, date}) => {
    const { getUser } = useAuth()
    const user = getUser(userId)
  return (
    <div className='post-header-container'>
        <UserAvatar user={user} />
        <div>
            <div className='post-username'>{user.name}</div>
            <div>{dateFromat(date)}</div>
        </div>
    </div>
  )
}

export default PostHeader