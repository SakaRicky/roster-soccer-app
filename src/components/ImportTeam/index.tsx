/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Button } from "../Button";
import { FileInput } from "../Form/FileInput";
import { parse, ParseConfig, RECORD_SEP, UNIT_SEP } from "papaparse";
import { Player } from "../../types";
import { useStateValue, setTeam } from "../../state";

type TeamSummary = {
	totalPlayer: number | undefined;
	goalkeepers: number | undefined;
	defenders: number | undefined;
	midfielders: number | undefined;
	forwards: number | undefined;
};

interface ImportTeamAttributes {
	closeModal: () => void;
}

export const ImportTeam = ({ closeModal }: ImportTeamAttributes) => {
	const [state, dispatch] = useStateValue();
	const [error, setError] = useState<boolean>(false);
	const [importedTeam, setImportedTeam] = useState<Player[]>();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [file, setFile] = useState<any | undefined>();
	const [summary, setSummary] = useState<TeamSummary>({
		totalPlayer: undefined,
		goalkeepers: undefined,
		defenders: undefined,
		midfielders: undefined,
		forwards: undefined,
	});

	const setTeamToState = () => {
		if (importedTeam) {
			dispatch(setTeam(importedTeam));
			closeModal();
			setSummary({
				totalPlayer: undefined,
				goalkeepers: undefined,
				defenders: undefined,
				midfielders: undefined,
				forwards: undefined,
			});
		}
	};

	const config: ParseConfig = {
		delimiter: "", // auto-detect
		newline: undefined, // auto-detect
		quoteChar: '"',
		escapeChar: '"',
		header: false,
		transformHeader: undefined,
		dynamicTyping: false,
		preview: 0,
		comments: false,
		step: undefined,
		complete: undefined,
		skipEmptyLines: false,
		fastMode: undefined,
		beforeFirstChunk: undefined,
		transform: undefined,
		delimitersToGuess: [",", "\t", "|", ";", RECORD_SEP, UNIT_SEP],
	};

	if (file) {
		parse(file, {
			complete: result => {
				//set this in case the error was true from preceding operation
				setError(false);
				const receivedTeam = result.data as string[][]; // Array that contains array of string
				// the firsst entry of CSV is for heading
				const header = receivedTeam[0];
				const playersStrings = receivedTeam.slice(1);
				// keep tracks of number of players per post for summary
				let numberOfGoalKeepers = 0;
				let numberOfDefenders = 0;
				let numberOfMidfielders = 0;
				let numberOfForwards = 0;

				const players = playersStrings.map(arrayPlayer => {
					arrayPlayer.forEach(str => {
						if (str === "") {
							setError(true);
							return;
						}
						switch (str) {
							case "Goalkeeper":
								numberOfGoalKeepers += 1;
								break;

							case "Defender":
								numberOfDefenders += 1;
								break;
							case "Midfielder":
								numberOfMidfielders += 1;
								break;
							case "Forward":
								numberOfForwards += 1;
								break;
							default:
								break;
						}
					});

					const player: Player = {
						name: arrayPlayer[0],
						image: arrayPlayer[1],
						jerseyNumber: arrayPlayer[2],
						position: arrayPlayer[3],
						height: parseInt(arrayPlayer[4]),
						weight: parseInt(arrayPlayer[5]),
						nationality: arrayPlayer[6],
						flagImage: arrayPlayer[7],
						starter: arrayPlayer[8],
						appearances: arrayPlayer[9],
						minutesPlayed: arrayPlayer[10],
						goals: arrayPlayer[11],
						assists: arrayPlayer[12],
						cleanSheets: arrayPlayer[13],
						saves: arrayPlayer[14],
					};

					return player;
				}, config);
				setSummary({
					totalPlayer: playersStrings.length,
					goalkeepers: numberOfGoalKeepers,
					defenders: numberOfDefenders,
					midfielders: numberOfMidfielders,
					forwards: numberOfForwards,
				});

				setImportedTeam(players);
				setFile(undefined);
			},
		});
		// prevent unstoppable renderings
		setFile(undefined);
	}

	return (
		<div className="bg-dark text-normal rounded-lg p-6">
			<div className="flex justify-between pb-4">
				<h3 className="text-heading">Importer</h3>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-6 w-6 cursor-pointer hover:text-orange"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					strokeWidth={2}
					onClick={closeModal}
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</div>
			<hr className="text-normal" />
			<div className="block my-6 text-left">
				<h6 className="mb-2">Roster File</h6>
				<FileInput error={error} handleSetFile={setFile} />

				{!error && (
					<div className="text-muted mt-4">File must be in .csv format</div>
				)}
			</div>
			{error && <div className="text-red text-left mt-2">Error</div>}
			{error && (
				<div className="mt-2 text-left">
					Your sheet is missing data. Please ensure all cells are filled out.
				</div>
			)}

			{summary.totalPlayer !== undefined && !error ? (
				<table className="text-normal w-full text-left">
					<tbody>
						<tr>
							<th className="font-normal">Total Players</th>
							<th className="font-normal">Goalkeepers</th>
							<th className="font-normal">Defenders</th>
							<th className="font-normal">Midfielders</th>
							<th className="font-normal">Forwards</th>
						</tr>
						<tr>
							<td>{summary.totalPlayer}</td>
							<td>{summary.goalkeepers}</td>
							<td>{summary.defenders}</td>
							<td>{summary.midfielders}</td>
							<td>{summary.forwards}</td>
						</tr>
					</tbody>
				</table>
			) : null}
			<div className="mt-48 text-right pr-4 pb-4">
				{summary.totalPlayer !== undefined && !error ? (
					<Button name="import" handleClick={setTeamToState} />
				) : (
					<Button name="import" disabled />
				)}
			</div>
		</div>
	);
};
