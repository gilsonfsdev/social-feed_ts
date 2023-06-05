import styles from './Post.module.css';
import { useState, FormEvent, ChangeEvent, InvalidEvent } from 'react';

// components
import { Comment } from './Comment';
import { Avatar } from './Avatar';

// date-fns
import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content {
  type: 'paragraph' | 'Link';
  content: string;
}

export interface PostType {
  id:number;
  author: Author;
  publishedAt: Date;
  content: Content[];
}

interface PostProps {
  post: PostType;
}


export function Post ({ post }:PostProps) {
  const [comments, setComments] = useState([
    'Post muito interessante!'
  ]);
  const [newCommentText, setNewCommentText] = useState('');


  const publishedDateFormatted = format(post.publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale:ptBR,
  });

  const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
    locale:ptBR,
    addSuffix:true
  });

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault();
    
    setComments([...comments, newCommentText]);

    setNewCommentText('');
  }

  function handleNewCommentChange (event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('')
    setNewCommentText(event.target.value);
  }

  function handleNewCommentInvalid (event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório!')
  }

  function deleteComment(commentToDelete: string){
    const commentWithoutDeletedOne = comments.filter(comment => {
      return comment != commentToDelete;
    })

    setComments(commentWithoutDeletedOne)
  }

  const isNewCommentEmpty = newCommentText.length === 0;

  return (
    <article className={styles.post}>
      <header className={styles.header}>
        <div className={styles.author}>
          <Avatar src={post.author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{post.author.name}</strong>
            <span>{post.author.role}</span>
          </div>
        </div>

        <time title= {publishedDateFormatted} dateTime={post.publishedAt.toISOString()}>
          {publishedDateRelativeToNow}
        </time>
      </header>
      <div className={styles.content}>
        {post.content.map((line, index) => {
          if(line.type === 'paragraph') {
            return <p key={index}>{line.content}</p>
          } else if (line.type === 'Link'){
            return <p key={index}><a href="#">{line.content}</a></p>
          } 
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea 
          placeholder='Deixe um comentário'
          onChange={handleNewCommentChange}
          value={newCommentText}
          onInvalid={handleNewCommentInvalid}
          required
        />
        <footer>
          <button 
            type='submit'
            disabled={isNewCommentEmpty}
          >
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment) => {
          return (
            <Comment 
              key={comment}
              content={comment}
              OnDeleteComment={deleteComment}
            />
          )
        })}
      </div>
    </article>
  )
}