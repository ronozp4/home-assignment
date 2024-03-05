import { Typography } from "@mui/material";
import Button from "../UI/Button";
import "./styles.css";
import { useEffect, useState } from "react";
import { PostData } from "../../types";
import { useAuth } from "../../context/AuthContext";
import { generateRandomInt } from "../../utils/tools";
import { addPostApi, editPostApi } from "../../api/posts";
import { usePosts } from "../../context/PostsContext";

type PostEditorProps = {
  closeEditor: () => void;
};

export const PostEditor: React.FC<PostEditorProps> = ({ closeEditor }) => {
  const { addPost, editPost, postEdit } = usePosts()

  const [content, setContent] = useState('')
  const [url, setUrl] = useState('')
  const { user } = useAuth()

  useEffect(()=>{
    console.log('hello',postEdit)
    if(!postEdit) return
    setContent(postEdit?.content || '')
    setUrl(postEdit?.imageUrl || '')

  },[postEdit])

  const onSubimit = ()=> {
    const isEdit = !!postEdit
    const post: PostData = {
      id: isEdit? postEdit.id : generateRandomInt(),
      content: content,
      date: (new Date()).toISOString(),
      userId: user.id,
      imageUrl: url,
      likes:  isEdit? postEdit.likes : []
    }
    if(isEdit){
      editPost(post)
      editPostApi(post)
    }else{ // add new post
      addPost(post)
      addPostApi(post)
    }
    
    closeEditor()
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span onClick={closeEditor} className="close">&times;</span>
        <div className="post-editor-content">
        <Typography className="app-title main" variant="h6">{!!postEdit? 'Edit':'Add New'} Post!</Typography>
          <textarea
            placeholder={"Add Some Content"}
            onChange={(e)=>setContent(e.target.value)}
            value={content}
            />
            <input
            placeholder={"Image URL"}
            onChange={(e)=>setUrl(e.target.value)}
            value={url}
            />
            <div className="buttons">
              <Button onClick={onSubimit} color="green" title="Submit" />
              <Button onClick={closeEditor} color="crimson" title="Cancel" />
            </div>

        </div>
      </div>


    </div>
  );
};
