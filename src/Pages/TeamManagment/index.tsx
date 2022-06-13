import React, { useEffect } from "react";
import { setModal, useStateValue } from "../../state";
import {
	Button,
	ImportTeam,
	Modal,
	SearchForm,
	TeamHeading,
	TeamTable,
	EditForm,
} from "../../components";
import { ConfirmDelete } from "../../components/ConfirmDelete";

export const TeamManagement = () => {
	const [state, dispatch] = useStateValue();

	useEffect(() => {
		// dispatch(setShowModal(true));
	}, []);

	const closeModal = () => {
		dispatch(setModal({ show: false, form: "" }));
	};

	return (
		<div className="flex flex-col h-full">
			<div className="flex justify-between items-center">
				<TeamHeading title="Roaster Details" />

				<div className="flex gap-2">
					<SearchForm />
					{state.team ? (
						<Button
							name="Re-Import Team"
							neutral
							handleClick={() =>
								dispatch(setModal({ show: true, form: "import" }))
							}
						/>
					) : (
						<Button
							name="Import Team"
							handleClick={() =>
								dispatch(setModal({ show: true, form: "import" }))
							}
						/>
					)}
				</div>
			</div>

			{/* state modal  */}
			{state.modal.show && state.modal.form === "edit" && (
				<Modal>
					<EditForm />
				</Modal>
			)}

			<div className="bg-[#2D2D2D] mt-6 flex-1 rounded-lg overflow-y-scroll overflow-x-hidden">
				{state.team ? <TeamTable /> : <TeamTable empty />}
			</div>
			{state.modal.show && state.modal.form === "import" && (
				<Modal>
					<ImportTeam closeModal={closeModal} />
				</Modal>
			)}
			{state.modal.show && state.modal.form === "delete" && (
				<Modal>
					<ConfirmDelete />
				</Modal>
			)}
		</div>
	);
};
