import React, { useState } from "react";
import { Player } from "../../types";
import { Actions } from "../Actions";

export interface TableRowAttribute {
	player: Player;
	index: number;
	closeActions: (i: number) => void;
	openActions: (i: number) => void;
	showActions: boolean;
}

export const TableRow = ({
	player,
	index,
	closeActions,
	openActions,
	showActions,
}: TableRowAttribute) => {
	return (
		<tr className="text-normal">
			<th scope="row" className="px-6 py-4 whitespace-nowrap">
				<div className="flex gap-2 items-center">
					<img src={player.flagImage} className="object-cover h-8 w-8" />
					{player.name}
				</div>
			</th>
			<td className="p-4">{player.jerseyNumber}</td>
			<td className="p-4">{player.starter}</td>
			<td className="p-4">{player.position}</td>
			<td className="p-4">{player.height.toString() + " m"}</td>
			<td className="p-4">
				{isNaN(player.weight) ? "Unknown" : player.weight.toString() + " kg"}
			</td>
			<td className="p-4">{player.nationality}</td>
			<td className="p-4">{player.appearances}</td>
			<td className="p-4">{player.minutesPlayed}</td>
			<td className="p-4 text-right relative">
				<div
					className={`${
						showActions ? "block" : "hidden"
					} absolute top-0 left-0 z-[5000] ml-[-150px]`}
				>
					<Actions closeActions={() => closeActions(index)} player={player} />
				</div>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-6 w-6 hover:text-orange cursor-pointer"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					strokeWidth={2}
					onClick={() => openActions(index)}
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
					/>
				</svg>
			</td>
		</tr>
	);
};
