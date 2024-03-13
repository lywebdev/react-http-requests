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
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    async function fetchJokesHandler() {
        setIsLoading(true);
        setError(null);

        try {
            let response = await fetch('https://v2.jokeapi.dev/joke/Any?amount=10/asdasdas/dasda');
            response = await response.json();

            if (response.error) {
                throw new Error(response.message);
            }

            setJokes(response.jokes);
        } catch (error) {
            setError(error.message);
        }

        setIsLoading(false);
    }
    

    let content = <p>Шуток не найдено</p>;

    if (jokes.length > 0) {
        content = <JokeList jokes={jokes}/>;
    }

    if (error) {
        content = <p>{error}</p>;
    }

    if (isLoading) {
        content = <p>Загрузка...</p>;
    }


    return (
        <React.Fragment>
            <section>
                <button onClick={fetchJokesHandler}>Fetch Jokes</button>
            </section>
            <section>
                {content}
            </section>
        </React.Fragment>
    );
}

export default App;
