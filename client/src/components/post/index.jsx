import React from 'react';

// import { Card } from 'react-bootstrap';
import { Comment, Tooltip } from 'antd';
import moment from 'moment';

import Avatar from '../avatar';

function Level({ poster, createdAt, content, children }) {
  return (
    <Comment
      // actions={[<span>Forward</span>, <span>Reply to</span>]}
      actions={[<span className="mr-sm-2"><i className="fas fa-retweet" /></span>, <span><i className="far fa-comment-dots" /></span>]}
      author={<span>{poster.username}</span>}
      avatar={<Avatar id={poster.id} />}
      datetime={
        <Tooltip title={moment(parseInt(createdAt)).format('YYYY-MM-DD HH:mm:ss')}>
          <span>{moment(parseInt(createdAt)).fromNow()}</span>
        </Tooltip>
      }
      content={<p>{content}</p>}
    >
      {children}
    </Comment>
  );
}

function Post() {
  return (
    <Level poster={{ id: 'x', username: 'YaY' }} content="auisgdi1u" />
    // <Level>
    //   <Level />
    //   <Level />
    // </Level>
    // <Card>
    //   <Card.Header>
    //     <Avatar id="testxx" />
    //   </Card.Header>
    //   <Card.Body>
    //     test
    //   </Card.Body>
    // </Card>
  );
}

export default Level;
