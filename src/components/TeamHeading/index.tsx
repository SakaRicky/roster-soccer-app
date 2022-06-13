import React, { useState } from "react";
import { useStateValue } from "../../state";
import { TextInput } from "../Form";

interface TeamHeadingAttributes {
	title: string;
}

export const TeamHeading = ({ title }: TeamHeadingAttributes) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [state, dispatch] = useStateValue();
	const [editableTeamName, setEditableTeamName] = useState<string>(
		state.teamName
	);
	const [showEditIcon, setShowEditIcon] = useState<boolean>(true);
	const [showEditForm, setShowEditForm] = useState<boolean>(false);
	const [editedName, setEditedName] = useState<boolean>(false);
	const [updatedTeamName, setUpdatedTeamName] = useState<string>(
		state.teamName
	);

	const handleEditedTeamName = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setEditedName(true);
		setEditableTeamName(updatedTeamName);
		setShowEditForm(false);
		setEditedName(true);
		setShowEditIcon(false);
	};

	const handleChangeTeamName = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUpdatedTeamName(e.target.value);
	};

	const handleOnMouseEnter = () => {
		if (editedName) {
			setShowEditIcon(true);
		}
	};

	const handleOnMouseLeave = () => {
		if (editedName) {
			setShowEditIcon(false);
		}
	};

	return (
		<div className="text-normal">
			<h4 className="text-orange">{title}</h4>

			{showEditForm ? (
				<div className="relative">
					<div className="absolute text-normal flex items-center inset-y-0 left-0 pl-2"></div>
					<form onSubmit={handleEditedTeamName}>
						<TextInput
							name="editTeamName"
							value={updatedTeamName}
							handleTextChange={handleChangeTeamName}
							placeholder={""}
						/>
						<div className="absolute flex items-center inset-y-0 right-0 pr-3">
							<button className="border-none text-orange" type="submit">
								Save
							</button>
						</div>
					</form>
				</div>
			) : (
				<div
					className="flex gap-2 items-center mt-2"
					onMouseEnter={handleOnMouseEnter}
					onMouseLeave={handleOnMouseLeave}
				>
					{editableTeamName}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className={`h-5 w-5 rounded-full hover:text-orange cursor-pointer ${
							showEditIcon ? "block" : "hidden"
						}`}
						viewBox="0 0 20 20"
						fill="currentColor"
						onClick={() => setShowEditForm(!showEditForm)}
					>
						<path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
					</svg>{" "}
				</div>
			)}
		</div>
	);
};
