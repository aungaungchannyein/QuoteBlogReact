import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useHttp from '../hooks/use-http';
import { getAllComments } from '../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';
import CommentList from './CommentsList';

import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);

  const param = useParams();

  const {quoteId } = param;

  const {sendRequest,status, data:loadedComments} = useHttp(getAllComments);

  useEffect(()=>{
    sendRequest(quoteId)
  },[quoteId,sendRequest]);

  let comments;

  if(status === 'pending'){
    comments =(
      <div className='centered'>
        <LoadingSpinner/>
      </div>
    );
  }

  if(status === 'completed' && (loadedComments && loadedComments.length >0)){
    comments =<CommentList comments={loadedComments}/>
  }

  if(status === 'completed' && (!loadedComments || loadedComments.length === 0)){
    comments = <p className='centered'>No comments were added yet!</p>
  }



  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const addCommentHandler = useCallback(() =>{
    sendRequest(quoteId);
  },[sendRequest,quoteId]);
  
  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm quoteId={quoteId} onAddedComment={addCommentHandler}/>}
      {comments}
    </section>
  );
};

export default Comments;
