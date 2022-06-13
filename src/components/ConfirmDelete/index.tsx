import React from "react";
import { setModal, setTeam, useStateValue } from "../../state";
import { Button } from "../Button";

export const ConfirmDelete = () => {
	const [state, dispatch] = useStateValue();

	const handleDelete = (e: React.FormEvent<EventTarget>) => {
		e.preventDefault();
		const newTeam = state.team?.filter(player => {
			if (state.player) {
				return player.name !== state.player.name;
			}
		});

		if (newTeam) {
			dispatch(setTeam(newTeam));
			dispatch(setModal({ show: false, form: "" }));
		}
	};

	return (
		<div className="bg-veryDark w-96 py-4 px-6 rounded-lg">
			<div className="flex justify-between">
				<h4 className="font-bold text-lg">Are you sure?</h4>
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
			<p className="my-6 text-left">This action cannot be undone</p>
			<form className="flex gap-2 flex-row-reverse">
				<Button
					name="Cancel"
					neutral
					handleClick={() => dispatch(setModal({ show: false, form: "" }))}
				/>
				<Button name="Delete" danger submit handleClick={handleDelete} />
			</form>
		</div>
	);
};
