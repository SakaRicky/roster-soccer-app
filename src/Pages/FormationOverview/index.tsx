import React from "react";
import { FootballField, PlayerDetails, TeamHeading } from "../../components";

export const FormationOverview = () => {
	return (
		<div className="flex flex-col h-full">
			<div className="flex justify-between items-center">
				<TeamHeading title="Formation Overview" />
			</div>

			<div className="bg-[#2D2D2D] mt-6 flex-1 rounded-lg flex items-center justify-center gap-8">
				<FootballField />
				<PlayerDetails />
			</div>

			{/* {state.modal.show && state.modal.form === "delete" && (
				<Modal>
					<ConfirmDelete />
				</Modal>
			)} */}
		</div>
	);
};
