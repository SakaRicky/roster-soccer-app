import React from "react";
import { setPlayer, useStateValue } from "../../state";
import { Player } from "../../types";

interface PlayerDisplayedAttributes {
	player: Player;
	margin?: string;
}

export const PlayerDisplayed = ({
	player,
	margin,
}: PlayerDisplayedAttributes) => {
	const [state, dispatch] = useStateValue();
	const bg = player.name === state.player?.name ? "bg-orange" : "bg-dark";

	return (
		<div
			className="text-sm text-heading flex flex-col items-center whitespace-nowrap cursor-pointer"
			onClick={() => dispatch(setPlayer(player))}
		>
			<div
				className={`rounded-full ${bg} h-7 w-7 border border-heading text-lg ${margin}`}
			>
				{player.jerseyNumber}
			</div>
			<div>{player.name}</div>
		</div>
	);
};
