/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState } from "react";
import { setModal, setTeam, useStateValue } from "../../state";
import { Player, Position } from "../../types";
import { Button } from "../Button";
import { NumberInput, TextInput, RadioInput, SelectInput } from "../Form";

// interface EditFormAttributes {
// 	closeModal: () => void;
// }

export const EditForm = () => {
	const [state, dispatch] = useStateValue();
	const [edited, setEdited] = useState<boolean>(false);
	const [playerToEdit, setPlayerToEdit] = useState<Player>(state.player!);

	const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;
		setEdited(true);
		switch (id) {
			case "name":
				setPlayerToEdit({
					...playerToEdit,
					name: value,
				});
				if (value === state.player!.name || value === "") {
					setEdited(false);
				}
				break;
			case "jerseyNumber":
				setPlayerToEdit({
					...playerToEdit,
					jerseyNumber: value,
				});
				if (value === state.player!.jerseyNumber || value === "") {
					setEdited(false);
				}
				break;
			case "height":
				setPlayerToEdit({
					...playerToEdit,
					height: parseInt(value),
				});
				if (parseInt(value) === state.player!.height || value === "") {
					setEdited(false);
				}
				break;
			case "weight":
				setPlayerToEdit({
					...playerToEdit,
					weight: parseInt(value),
				});
				if (parseInt(value) === state.player!.weight || value === "") {
					setEdited(false);
				}
				break;
			default:
				break;
		}
	};

	const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;
		setEdited(true);
		switch (id) {
			case "height":
				console.log("typeof height in onChange: ", typeof value);

				setPlayerToEdit({
					...playerToEdit,
					height: parseInt(value),
				});
				if (parseInt(value) === state.player!.height || value === "") {
					setEdited(false);
				}
				break;
			case "weight":
				setPlayerToEdit({
					...playerToEdit,
					weight: parseInt(value),
				});
				if (parseInt(value) === state.player!.weight || value === "") {
					setEdited(false);
				}
				break;
			default:
				break;
		}
	};

	const handleSelectChange = (e: React.FormEvent<HTMLSelectElement>) => {
		const { id, value } = e.currentTarget;
		setEdited(true);
		switch (id) {
			case "nationality":
				setPlayerToEdit({
					...playerToEdit,
					nationality: value,
				});

				if (value === state.player!.nationality || value === "") {
					setEdited(false);
				}
				break;

			case "position":
				if (value === state.player!.position || value === "") {
					setEdited(false);
					break;
				}
				setPlayerToEdit({
					...playerToEdit,
					position: value,
				});
				break;
			default:
				break;
		}
	};

	const handleRadioChange = (starter: string) => {
		if (starter === state.player!.starter) {
			setEdited(false);
			return;
		}

		setPlayerToEdit({
			...playerToEdit,
			starter: starter,
		});
		setEdited(true);
	};

	const handleSetEdit = (e: React.FormEvent<EventTarget>) => {
		e.preventDefault();

		const newTeam = state.team!.map(player => {
			return player.name === state.player!.name ? playerToEdit : player;
		});
		dispatch(setTeam(newTeam));
		dispatch(setModal({ show: false, form: "" }));
	};

	return (
		<div className="p-6 my-4 w-144 bg-veryDark rounded-lg">
			<div className="flex justify-between">
				<h4 className="font-bold text-lg">Edit Player</h4>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-5 w-5 cursor-pointer hover:text-orange"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					strokeWidth={2}
					onClick={() => dispatch(setModal({ show: false, form: "" }))}
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</div>
			<form>
				<div className="flex gap-4 justify-between">
					<div className="w-4/5">
						<TextInput
							name="name"
							label="Player Name"
							placeholder="Player Name"
							value={playerToEdit.name}
							handleTextChange={handleTextChange}
						/>
					</div>

					<TextInput
						name="jerseyNumber"
						label="Jersey Number"
						placeholder="Jersey Number"
						value={playerToEdit.jerseyNumber}
						handleTextChange={handleTextChange}
					/>
				</div>
				<div className="flex gap-4">
					<div className="w-1/2">
						<NumberInput
							name="height"
							label="Height"
							value={playerToEdit.height}
							handleChange={handleNumberChange}
						/>
					</div>

					<div className="w-1/2">
						<NumberInput
							name="weight"
							label="Weight"
							value={playerToEdit.weight}
							handleChange={handleNumberChange}
						/>
					</div>
				</div>
				<div className="mt-2">
					<SelectInput
						handleSelectChange={handleSelectChange}
						name="nationality"
						label="Nationality"
						options={["France", "Italy", "Argentina", "Cameroon"]}
						value={playerToEdit.nationality}
					/>
				</div>
				<div className="mt-2">
					<SelectInput
						label="Position"
						name="position"
						options={[
							Position.goalkeeper,
							Position.defender,
							Position.midfielder,
							Position.forward,
						]}
						handleSelectChange={handleSelectChange}
						value={playerToEdit.position}
					/>
				</div>

				<RadioInput
					title="Starter"
					options={["No", "Yes"]}
					value={state.player!.starter}
					handleRadioChange={handleRadioChange}
				/>

				<div className="flex flex-row-reverse">
					{edited ? (
						<Button name="Edit Player" submit handleClick={handleSetEdit} />
					) : (
						<Button disabled name="Edit Player" />
					)}
				</div>
			</form>
		</div>
	);
};
