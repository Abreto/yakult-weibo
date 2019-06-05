import React from 'react';
// import PropTypes from 'prop-types';

// import { Tooltip } from 'antd';
// actions={[<span>Forward</span>, <span>Reply to</span>]}
// className="mr-sm-2"

import Favourite from './favourite';
import Forward from './forward';

const replyto = (<span><i className="far fa-comment-dots" /> 5</span>);

// const descriptions = [
//   'Favourite',
//   'Forward',
//   'Reply to'
// ];

export default (id, refetch) => ([
  <Favourite id={id} />,
  <Forward id={id} refetch={refetch} />,
  replyto,
]);
