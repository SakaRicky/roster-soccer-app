import React from "react";
import { useStateValue } from "../../state";
import { Image } from "./Image";

export const PlayerDetails = () => {
	const [state] = useStateValue();

	return (
		<div className="w-[25vw] h-[60vh] bg-dark rounded-lg px-6">
			<div className="h-2/3">
				<div className="bg-dark">
					{state.player && (
						<Image
							imgURL={state.player.image}
							jerseyNumber={state.player.jerseyNumber}
							name={state.player.name}
							position={state.player.position}
						/>
					)}
				</div>
				<div className="flex justify-between py-4">
					<div className="">
						<div className="mb-2 text-sm">Height</div>
						{state.player && (
							<div className="c text-heading">
								{state.player.height.toString() + " m"}
							</div>
						)}
					</div>
					<div className="">
						<div className="mb-2 text-sm">Weight</div>
						{state.player && (
							<div className="text-heading">
								{isNaN(state.player.weight)
									? "Unknown"
									: state.player.weight.toString() + " kg"}
							</div>
						)}
					</div>
					<div className="">
						<div className="mb-2 text-sm">Nationality</div>
						<div className="flex items-center gap-2 text-heading">
							{state.player && (
								<img
									src={state.player?.flagImage}
									className="object-cover h-6 w-6"
									alt=""
								/>
							)}
							{state.player?.nationality}
						</div>
					</div>
				</div>
			</div>
			<hr className="text-disabled" />
			<div className="h-1/3 text-left mt-4">
				<div className="flex gap-16">
					<div className="">
						<div className="text-orange text-2xl">
							{state.player?.appearances}
						</div>
						<div>Appearances</div>
					</div>
					<div className="">
						<div className="text-orange text-2xl">
							{state.player?.minutesPlayed}
						</div>
						<div>Minutes Played</div>
					</div>
				</div>
				<div className="flex gap-16 mt-4">
					<div className="">
						<div className="text-orange text-3xl">
							{state.player?.cleanSheets}
						</div>
						<div>Clean Sheets</div>
					</div>
					<div className="">
						<div className="text-orange text-3xl">{state.player?.saves}</div>
						<div>Saves</div>
					</div>
				</div>
			</div>
		</div>
	);
};
