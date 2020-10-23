import React from "react";
import "./App.css";
import Voting from "./Voting";

function App() {
    return (
        <div className="App">
            <h1>Good bois!</h1>
            <Doggos />
        </div>
    );
}

interface Doggo {
    name: string;
    owner: string;
    is_crazy_killer_dog: boolean;
    img: string;
}

const toDoggo = (data: any) => ({
    name: data["name"]["value"],
    owner: data["owner_name"]["value"],
    is_crazy_killer_dog: data["is_crazy_killer_dog"]["value"],
    img: data["img"]["value"]["main"]["url"],
});

const Doggos = () => {
    const [doggos, setDoggos] = React.useState<Doggo[]>([]);

    React.useEffect(() => {
        const getAndSetDoggos = async () => {
            const tmp = await fetch(
                "https://doggos.prismic.io/api/v1/documents/search?ref=X5LXUxAAACAAaH2I#format=json"
            );
            const data = await tmp.json();
            console.log("doggos", data);

            const resultDoggos = data.results.map((d: any) =>
                toDoggo(d.data.dog)
            );

            setDoggos(resultDoggos);
        };

        getAndSetDoggos();
    }, []);

    return (
        <div>
            {doggos.map((d) => (
                <Doggo doggo={d} />
            ))}
            <Voting />
        </div>
    );
};

interface DogArgs {
    doggo: Doggo;
}

const Doggo = ({ doggo }: { doggo: Doggo }) => (
    <div>
        <div>
            <h2>{doggo.name}</h2>
            <div>Omistaja: {doggo.owner}</div>
            <img src={doggo.img} alt="doggo" />
            <div>
                {doggo.is_crazy_killer_dog ? "KILLER DOGGO" : "Nice doggo"}
            </div>
        </div>
    </div>
);

export default App;
