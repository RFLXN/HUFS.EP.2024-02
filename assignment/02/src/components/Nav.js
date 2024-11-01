// src/components/Nav.js
import React from 'react';

function Nav(props) {
  const lis = props.topics.map(topic => (
    <li key={topic.id}>
      <a
        id={topic.id}
        href={`/read/${topic.id}`}
        onClick={(event) => {
          event.preventDefault();
          props.onChangeMode(Number(event.target.id));
        }}
      >
        {topic.title}
      </a>
    </li>
  ));

  return (
    <nav>
      <ol>
        {lis}
      </ol>
    </nav>
  );
}

export default Nav;
