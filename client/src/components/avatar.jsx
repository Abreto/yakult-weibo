import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import gravatar from 'gravatar';

import { Avatar } from 'antd';

function url(child) {
  // https://www.npmjs.com/package/gravatar
  return gravatar.url(
    `${child}@yakult-weibo.fun`,
    {
      s: 128,
      r: 'pg',
      d: 'retro', // http://cn.gravatar.com/site/implement/images/
    },
    true,
  );
}

const YWAvatar = (props) => {
  const { id } = props;
  const passProps = _.clone(props);
  delete passProps.id;
  return (
    <Avatar
      {...passProps}
      src={url(id)}
    />
  );
};
YWAvatar.propTypes = {
  id: PropTypes.string.isRequired,
};

export default YWAvatar;
