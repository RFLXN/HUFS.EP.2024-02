// src/components/Create.js
import React from 'react';

function Create(props) {
  return (
    <article>
      <h2>Create</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const title = event.target.title.value;
          const body = event.target.body.value;
          props.onCreate(title, body);
        }}
      >
        <p>
          <input
            type="text"
            name="title"
            placeholder="Title"
            required
          />
        </p>
        <p>
          <textarea
            name="body"
            placeholder="Body"
            required
          ></textarea>
        </p>
        <p>
          <input type="submit" value="Create" />
        </p>
      </form>
    </article>
  );
}

export default Create;
