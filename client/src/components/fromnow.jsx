import React from 'react';
import moment from 'moment';

import { Tooltip } from 'antd';

const FromNow = ({ timestampStr }) => {
  const mom = moment(parseInt(timestampStr, 10));
  return (
    <Tooltip title={mom.format('YYYY-MM-DD HH:mm:ss')}>
      <span>{mom.fromNow()}</span>
    </Tooltip>
  );
};

export default FromNow;
