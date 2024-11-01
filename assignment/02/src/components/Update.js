// src/components/Update.js
import React, { useState } from 'react';

function Update(props) {
  // Convert props to state to allow editing
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);

  return (
    <article>
      <h2>Update</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          props.onUpdate(title, body);
        }}
      >
        <p>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </p>
        <p>
          <textarea
            name="body"
            placeholder="Body"
            value={body}
            onChange={(event) => setBody(event.target.value)}
            required
          ></textarea>
        </p>
        <p>
          <input type="submit" value="Update" />
        </p>
      </form>
    </article>
  );
}

export default Update;
