// Easter Egg to test CORS of React App
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../layout/Loader";

function EasterEgg() {
	const [isLoading, setLoading] = useState(true);
	const [pokemon, setPokemon] = useState();

	const baseurl = "https://pokeapi.co/";

	useEffect(() => {
		axios.get(`${baseurl}api/v2/pokemon/5`).then((response) => {
			setPokemon(response.data);
			setLoading(false);
		});
	}, []);

	if (isLoading) {
		return (
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					height: "100vh",
					backgroundColor: "grey",
				}}
			>
				<Loader />
			</div>
		);
	}

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				height: "100vh",
				backgroundColor: "grey",
			}}
		>
			<div>{pokemon.name}</div>
			<img alt={pokemon.name} src={pokemon.sprites.front_default} />
		</div>
	);
}

export default EasterEgg;
