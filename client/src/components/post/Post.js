// imports the packages
import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// imports the components
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

// imports the redux action
import { getPost } from '../../actions/post';

const Post = ({ getPost, post: { post, loading }, match }) => {
  // implements the use effect, similar to component will mount life cycle
  useEffect(() => {
    // gets the single post with the id from the url
    getPost(match.params.id);
  }, [getPost, match.params.id]);

  // returns a loading icon or the component
  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to='/posts' className='btn'>
        Back To Post
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />
      <div className='comments'>
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </Fragment>
  );
};

// holds the types of props we are expecting
Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

// maps the redux state to our props
const mapStateToProps = (state) => ({
  post: state.post,
});

// exports the component using react-redux connect
export default connect(mapStateToProps, { getPost })(Post);
