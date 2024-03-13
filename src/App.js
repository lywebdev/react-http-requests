import React, {useState} from "react";

import JokeList from "./components/JokeList";
import "./App.css";

function App() {
    // const dummyJokes = [
    //   {
    //     id: 1,
    //     type: "general",
    //     setup: "What do you call a bee that lives in America?",
    //     punchline: "A USB.",
    //   },
    //   {
    //     id: 2,
    //     type: "programming",
    //     setup: "What's the best thing about a Boolean?",
    //     punchline: "Even if you're wrong, you're only off by a bit.",
    //   },
    // ];

    const [jokes, setJokes] = useState([]);

    async function fetchJokesHandler() {
        const response = await fetch('https://v2.jokeapi.dev/joke/Any?amount=10');
        const data = await response.json();

        setJokes(data.jokes);
    }

    return (
        <React.Fragment>
            <section>
                <button onClick={fetchJokesHandler}>Fetch Jokes</button>
            </section>
            <section>
                <JokeList jokes={jokes}/>
            </section>
        </React.Fragment>
    );
}

export default App;
