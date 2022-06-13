import React from "react";
import { setModal, setPlayer, useStateValue } from "../../state";
import { Player } from "../../types";

interface ActionsAttributes {
	closeActions: () => void;
	player: Player;
}
export const Actions = ({ closeActions, player }: ActionsAttributes) => {
	const [_state, dispatch] = useStateValue();

	const handleEditClick = () => {
		dispatch(setModal({ show: true, form: "edit" }));
		dispatch(setPlayer(player));
	};

	const handleDeleteClick = () => {
		dispatch(setModal({ show: true, form: "delete" }));
		dispatch(setPlayer(player));
	};

	return (
		<div className="p-4 w-56 bg-veryDark rounded-lg">
			<div className="flex justify-between">
				<h4 className="font-bold">Actions</h4>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-5 w-5 cursor-pointer hover:text-orange"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					strokeWidth={2}
					onClick={closeActions}
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</div>
			<div className="my-6">
				<div
					className="flex gap-4 cursor-pointer hover:text-orange"
					onClick={handleEditClick}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5  rounded-full hover:text-orange cursor-pointer"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
					</svg>
					<span>Edit Player</span>
				</div>
				<div
					className="flex gap-4 cursor-pointer hover:text-red mt-4"
					onClick={handleDeleteClick}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
							clipRule="evenodd"
						/>
					</svg>
					<span>Delete Player</span>
				</div>
			</div>
		</div>
	);
};
