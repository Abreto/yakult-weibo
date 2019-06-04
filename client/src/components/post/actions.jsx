import React from 'react';
import PropTypes from 'prop-types';

// actions={[<span>Forward</span>, <span>Reply to</span>]}
// actions={[<span className="mr-sm-2"><i className="fas fa-heart" /></span>, <span className="mr-sm-2"><i className="fas fa-retweet" /></span>, <span><i className="far fa-comment-dots" /></span>]}

const favourite = (<span className="mr-sm-2"><i className="far fa-heart" /></span>);

const forward = (<span className="mr-sm-2"><i className="fas fa-retweet" /></span>);

const replyto = (<span><i className="far fa-comment-dots" /> 5</span>);

export default id => ([
  favourite,
  forward,
  replyto,
]);
