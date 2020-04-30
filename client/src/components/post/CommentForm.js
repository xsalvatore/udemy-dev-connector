// import the packages
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import the redux action
import { addComment } from '../../actions/post';

const CommentForm = ({ postId, addComment }) => {
  // holds the component state
  const [text, setText] = useState('');

  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Leave a Comment</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={(e) => {
          e.preventDefault();
          addComment(postId, { text });
          setText('');
        }}
      >
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Add a comment'
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        ></textarea>
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

// holds the types of props we are expecting
CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

// exports the component using connect from react-redux
export default connect(null, { addComment })(CommentForm);
