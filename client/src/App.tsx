import { useEffect, useState } from "react";
import { Header, PostEditor } from "./components";
import { PostData, UserData } from "./types";
import { getAllUsersApi } from "./api/users";
import { getAllPostsApi } from "./api/posts";
import { useAuth } from "./context/AuthContext";
import PostItem from "./components/PostItem/PostItem";
import './index.css';
import { usePosts } from "./context/PostsContext";

function App() {
  // const [users, setUsers] = useState<UserData[]>([]);
  // const [posts, setPosts] = useState<PostData[]>([]);
  const { allUsersInit } = useAuth()
  const { allPostsInit, allPosts, setPostEdit } = usePosts()
  const [isPostEditorOpen, setIsPostEditorOpen] = useState(false);
  const openEditor = () => setIsPostEditorOpen(true);
  const closeEditor = () => {
    setPostEdit(null)
    setIsPostEditorOpen(false)
  };

  useEffect(() =>{
    getAllUsersApi(allUsersInit)
    getAllPostsApi(allPostsInit)
  },[])

  return (
    <>
      <Header openPostEditor={openEditor} />
      <div className="posts-wrapper">
        {
          allPosts.map(post => <PostItem openEditor={openEditor} key={post.id} post={post} />)
        }
      </div>
      {isPostEditorOpen ? <PostEditor closeEditor={closeEditor} />: null}
    </>
  );
}

export default App;
