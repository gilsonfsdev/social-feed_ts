import { ThumbsUp, Trash } from 'phosphor-react';
import styles from './Comment.module.css';
import { Avatar } from './Avatar'
import { useState } from 'react';

interface CommentProps {
  content: string;
  OnDeleteComment: (comment: string) => void;
}

export function Comment ({content, OnDeleteComment}: CommentProps) {
  const [likeCount, setLikeCount] = useState(0);


  function handleDeleteComment(){
    OnDeleteComment(content);
  }

  function handleLikeComment () {
    setLikeCount((state) => {
      return state + 1;
    });
  }

  return(
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="https://media.licdn.com/dms/image/C5603AQFNLZuHXeX41A/profile-displayphoto-shrink_200_200/0/1517549646726?e=1690416000&v=beta&t=A4wyaECvLqDcaWch6tmEa1LGy-g30DeLi5ue7euT4-Y" alt=""/>

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Maria Gabriela</strong>
              <time title='11 de maio às 08:13h' dateTime='2022-05-11 08:13:30'>Cerca de 1h atrás</time>
            </div>

            <button onClick={handleDeleteComment} title='Deletar'>
              <Trash size ={24}/>
            </button>
          </header>

          <p>{content}</p>

        </div>

        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  )
}