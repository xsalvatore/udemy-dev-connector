// imports the packages
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// imports the redux action
import { addPost } from '../../actions/post';

const PostForm = ({ addPost }) => {
  // holds our component state
  const [text, setText] = useState('');

  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Say Something...</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={(e) => {
          e.preventDefault();
          addPost({ text });
          setText('');
        }}
      >
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Create a post'
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
PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

// exports the component using react-redux connect
export default connect(null, { addPost })(PostForm);
