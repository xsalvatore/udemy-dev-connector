// imports the packages
import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// imports the components
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';

// imports the redux action
import { getPosts } from '../../actions/post';

const Posts = ({ getPosts, post: { posts, loading } }) => {
  // implements the use effect hook
  useEffect(() => {
    // gets all posts
    getPosts();
  }, [getPosts]);

  // returns the component or a loader
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Posts</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome to the community
      </p>
      <PostForm />
      <div className='posts'>
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </Fragment>
  );
};

// holds the types of props we are expecting
Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

// maps our redux state to our props
const mapStateToProps = (state) => ({
  post: state.post,
});

// exports the component using react-redux connect
export default connect(mapStateToProps, { getPosts })(Posts);
