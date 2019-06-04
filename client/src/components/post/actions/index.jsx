import React from 'react';
import PropTypes from 'prop-types';

import { Tooltip } from 'antd';
// actions={[<span>Forward</span>, <span>Reply to</span>]}
// className="mr-sm-2"

import Favourite from './favourite';

const forward = (<span><i className="fas fa-retweet" /></span>);

const replyto = (<span><i className="far fa-comment-dots" /> 5</span>);

const descriptions = [
  'Favourite',
  'Forward',
  'Reply to'
];

export default id => ([
  <span><Favourite id={id} /></span>,
  forward,
  replyto,
].map((component, idx) => (
  <Tooltip title={descriptions[idx]}>
    {component}
  </Tooltip>
)));
