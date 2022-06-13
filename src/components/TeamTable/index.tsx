import React, { useEffect, useState } from "react";
import { setModal, useStateValue } from "../../state";
import { Button } from "../Button";
import { TableHead } from "./TableHead";
import { TableRow } from "./TableRow";

interface TeamTableAttributes {
	empty?: boolean;
}

export const TeamTable = ({ empty }: TeamTableAttributes) => {
	const [state, dispatch] = useStateValue();
	const [showActions, setshowActions] = useState<boolean[]>(
		Array(state.team?.length).fill(false)
	);

	useEffect(() => {
		if (state.team) {
			setshowActions(Array(state.team.length).fill(false));
		}
	}, [state]);

	const closeActions = (index: number) => {
		if (showActions) {
			const newShowActions = showActions.map((actionState, i) => {
				if (i === index) {
					return false;
				}
				return actionState;
			});
			setshowActions(newShowActions);
		}
	};

	const openActions = (index: number) => {
		if (showActions) {
			const newShowActions = showActions.map((actionState, i) => {
				if (i === index) {
					return true;
				}
				return false;
			});
			setshowActions(newShowActions);
		}
	};

	const teamToRender = state.filteredTeam
		? state.filteredTeam.map((player, index) => {
				return (
					<TableRow
						key={player.name}
						player={player}
						index={index}
						closeActions={closeActions}
						openActions={openActions}
						showActions={showActions ? showActions[index] : false}
					/>
				);
		  })
		: state.team
		? state.team.map((player, index) => {
				return (
					<TableRow
						key={player.name}
						player={player}
						index={index}
						closeActions={closeActions}
						openActions={openActions}
						showActions={showActions ? showActions[index] : false}
					/>
				);
		  })
		: null;

	if (empty) {
		return (
			<div className="text-sm text-normal pt-4 h-full">
				<table className="w-full text-left">
					<TableHead empty />
				</table>
				<div className="flex flex-col justify-center h-[80%]">
					<div>
						You do not have any players on the Roster
						<Button
							name="Import Team"
							noBG={true}
							handleClick={() =>
								dispatch(setModal({ show: true, form: "import" }))
							}
						/>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="text-sm text-normal pt-4 h-full">
			<table className="w-full text-left">
				<TableHead />
				{state.team && <tbody>{teamToRender}</tbody>}
			</table>
		</div>
	);
};
