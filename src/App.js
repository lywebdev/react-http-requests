import React, {useCallback, useEffect, useState} from "react";

import JokeList from "./components/JokeList";
import "./App.css";
import AddJoke from "./components/AddJoke";

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

    const fetchJokesHandler = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            let response = await fetch('https://react-udemy-http-requests-default-rtdb.firebaseio.com/jokes.json');
            response = await response.json();

            if (response.error) {
                throw new Error(response.message);
            }

            const loadedJokes = [];
            for (const key in response) {
                loadedJokes.push({
                    id: key,
                    type: response[key].type,
                    setup: response[key].setup,
                    punchline: response[key].punchline,
                });
            }

            setJokes(loadedJokes.reverse());
        } catch (error) {
            setError(error.message);
        }

        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchJokesHandler();
    }, [fetchJokesHandler]);

    async function addJokeHandler(joke) {
        const response = await fetch('https://react-udemy-http-requests-default-rtdb.firebaseio.com/jokes.json', {
            method: 'post',
            body: JSON.stringify(joke),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();
    }

    let content = <p>Шуток не найдено</p>;

    if (jokes !== null && jokes !== undefined && jokes.length > 0) {
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
                <AddJoke onAddJoke={addJokeHandler} />
            </section>
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
