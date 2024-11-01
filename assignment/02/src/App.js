// src/App.js
import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Nav from './components/Nav';
import Article from './components/Article';
import Create from './components/Create';
import Update from './components/Update';

function App() {
    // State declarations
    const [mode, setMode] = useState('WELCOME');

    /* ----- added 1: search input state ----- */
    const [searchInput, setSearchInput] = useState("");

    const [id, setId] = useState(null);
    const [topics, setTopics] = useState([
        { id: 1, title: 'HTML', body: 'HTML is the standard markup language for creating Web pages.' },
        { id: 2, title: 'CSS', body: 'CSS is the language we use to style an HTML document.' },
        { id: 3, title: 'JavaScript', body: 'JavaScript is the programming language of the Web.' }
    ]);
    const [nextId, setNextId] = useState(4);

    /* ----- added 2: search function ----- */
    const searchTopics = () => {
        const searched = topics.filter(t => t.title.toLowerCase().includes(searchInput.toLowerCase()));
        if (searched.length <= 0) {
            // return when not found
            return [{ id: -1, title: "None", body: "Search Result Not Found" }];
        }
        return searched;
    };

    let content = null;
    let contextControl = null;

    if (mode === 'WELCOME') {
        content = <Article title="Welcome" body="Hello, Web"/>;
    } else if (mode === 'READ') {
        // Find the selected topic based on the current id
        const selectedTopic = topics.find(topic => topic.id === id);
        if (selectedTopic) {
            content = <Article title={selectedTopic.title} body={selectedTopic.body}/>;
            // Only show Update and Delete controls in READ mode
            contextControl = (
                <>
                    <li>
                        <a
                            href={`/update/${id}`}
                            onClick={(event) => {
                                event.preventDefault();
                                setMode('UPDATE');
                            }}
                        >
                            Update
                        </a>
                    </li>
                    <li>
                        <input
                            type="button"
                            value="Delete"
                            onClick={() => {
                                // Create a new array excluding the topic with the current id
                                const newTopics = topics.filter(topic => topic.id !== id);
                                setTopics(newTopics);
                                setMode('WELCOME');
                                setId(null);
                            }}
                        />
                    </li>
                </>
            );
        } else {
            // If no topic is found, fallback to Welcome
            content = <Article title="Welcome" body="Hello, Web"/>;
            setMode('WELCOME');
        }
    } else if (mode === 'CREATE') {
        content = (
            <Create
                onCreate={(title, body) => {
                    const newTopic = { id: nextId, title, body };
                    const newTopics = [...topics, newTopic];
                    setTopics(newTopics);
                    setNextId(nextId + 1);
                    setMode('READ');
                    setId(nextId);
                }}
            />
        );
    } else if (mode === 'UPDATE') {
        // Find the selected topic to pre-fill the Update form
        const selectedTopic = topics.find(topic => topic.id === id);
        if (selectedTopic) {
            content = (
                <Update
                    title={selectedTopic.title}
                    body={selectedTopic.body}
                    onUpdate={(title, body) => {
                        const updatedTopics = topics.map(topic => {
                            if (topic.id === id) {
                                return { ...topic, title, body };
                            }
                            return topic;
                        });
                        setTopics(updatedTopics);
                        setMode('READ');
                    }}
                />
            );
        } else {
            // If no topic is found, fallback to Welcome
            content = <Article title="Welcome" body="Hello, Web"/>;
            setMode('WELCOME');
        }
    }

    return (
        <div className="App">
            <Header title="WEB" onChangeMode={() => setMode('WELCOME')}/>

            {/* ----- added 3: search form ----- */}
            <input type="text" value={searchInput} onChange={(e) => {
                setSearchInput(e.target.value);
            }}/>

            {/* ----- added 4: give topics from search function result ----- */}
            <Nav
                topics={searchTopics()}
                onChangeMode={(selectedId) => {
                    setMode('READ');
                    setId(selectedId);
                }}
            />
            {content}
            <ul>
                <li>
                    <a
                        href="/create"
                        onClick={(event) => {
                            event.preventDefault();
                            setMode('CREATE');
                        }}
                    >
                        Create
                    </a>
                </li>
                {contextControl}
            </ul>
        </div>
    );
}

export default App;
