import React from 'react';
// import PropTypes from 'prop-types';

// import { Tooltip } from 'antd';
// actions={[<span>Forward</span>, <span>Reply to</span>]}
// className="mr-sm-2"

import Favourite from './favourite';
import Forward from './forward';
import ReplyTo from './replyto';

// const descriptions = [
//   'Favourite',
//   'Forward',
//   'Reply to'
// ];

export default (id, refetch) => ([
  <Favourite id={id} />,
  <Forward id={id} refetch={refetch} />,
  <ReplyTo id={id} />,
]);
