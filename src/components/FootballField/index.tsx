import React, { useEffect, useState } from "react";
import { setModal, setPlayer, useStateValue } from "../../state";
import { Player } from "../../types";
import { Modal } from "../Modal";
import { PlayerDisplayed } from "../PlayerDisplayered";

export const FootballField = () => {
	const [state, dispatch] = useStateValue();
	const [goalkeeper, setGoalkeeper] = useState<Player[]>();
	const [defenders, setDefenders] = useState<Player[]>();
	const [midfielders, setMidfielders] = useState<Player[]>();
	const [forwards, setForwards] = useState<Player[]>();
	const [errorData, setErrorData] = useState({ heading: "", message: "" });

	useEffect(() => {
		if (state.team) {
			const starters = state.team.filter(player => {
				return player.starter === "Yes";
			});
			const goalkeepers = starters.filter(player => {
				return player.position === "Goalkeeper";
			});
			const defenders = starters.filter(player => {
				return player.position === "Defender";
			});
			const midfielders = starters.filter(player => {
				return player.position === "Midfielder";
			});
			const forward = starters.filter(player => {
				return player.position === "Forward";
			});

			if (
				goalkeepers.length !== 1 ||
				defenders.length !== 4 ||
				midfielders.length !== 3 ||
				forward.length !== 3
			) {
				setErrorData({
					heading: "Not enough starters",
					message:
						"Your team doesn’t have enough starters  for one or more of the positions in the 4-3-3 formation",
				});
				dispatch(setModal({ show: true, form: "pitchError" }));
			} else {
				setGoalkeeper(goalkeepers);
				dispatch(setPlayer(goalkeepers[0]));
				setDefenders(defenders);
				setMidfielders(midfielders);
				setForwards(forward);
			}
		} else {
			setErrorData({
				heading: "No player data found",
				message: "Please importer your roster first",
			});
			dispatch(setModal({ show: true, form: "pitchError" }));
		}
	}, [state.team]);

	return (
		<div className="footballPitch rounded-lg flex items-center justify-center p-8">
			<div className="relative border border-muted w-full h-full rounded-sm flex items-center justify-between border-opacity-[0.5]">
				<div className="border -ml-[1px] border-muted h-[70%] w-[20%] flex items-center border-opacity-[0.5]">
					<div className="h-1/2 w-1/2 -ml-[1px] border border-muted border-opacity-[0.5] flex flex-col justify-center">
						{goalkeeper && errorData.heading === "" && (
							<PlayerDisplayed player={goalkeeper[0]} />
						)}
					</div>
				</div>
				<div className=" absolute left-28 flex flex-col gap-24">
					{errorData.heading === "" &&
						defenders?.map((defender, i) => {
							return i === 0 || i == 3 ? (
								<div key={defender.name} className="self-end">
									<PlayerDisplayed player={defender} />
								</div>
							) : (
								<PlayerDisplayed key={defender.name} player={defender} />
							);
						})}
				</div>
				<div className="absolute inset-x-[40%] -traslate-x-[50%] h-[8rem] w-[8rem] rounded-full border border-muted opacity-[0.5]"></div>
				<div className="relative h-full border border-muted border-opacity-[0.5]">
					<div className="absolute h-[70%] top-[15%] -left-12 flex flex-col justify-between">
						{errorData.heading === "" &&
							midfielders?.map(midfielder => {
								return (
									<PlayerDisplayed key={midfielder.name} player={midfielder} />
								);
							})}
					</div>
				</div>

				<div className="absolute right-32 h-[75%] top-[15%] flex flex-col justify-around">
					{errorData.heading === "" &&
						forwards?.map((forward, i) => {
							return i === 1 ? (
								<div key={forward.name} className="self-end">
									<PlayerDisplayed player={forward} />
								</div>
							) : (
								<PlayerDisplayed key={forward.name} player={forward} />
							);
						})}
				</div>

				<div className="border -mr-[1px] border-muted h-[70%] w-[20%] flex flex-row-reverse items-center opacity-[0.5]">
					<div className="h-1/2 w-1/2 -mr-[1px] border border-muted opacity-[0.5]"></div>
				</div>
			</div>
			{state.modal.show && state.modal.form === "pitchError" && (
				<Modal>
					<div className="bg-dark w-[65%] mx-auto p-8 rounded-lg">
						<div className="flex items-center justify-center gap-4 mb-4">
							<svg
								width="19"
								height="17"
								viewBox="0 0 19 17"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M18.2891 14.4102L10.8008 1.61328C10.2031 0.628906 8.76172 0.628906 8.19922 1.61328L0.675781 14.4102C0.113281 15.3945 0.816406 16.625 1.97656 16.625H16.9883C18.1484 16.625 18.8516 15.3945 18.2891 14.4102ZM8.65625 5.65625C8.65625 5.19922 9.00781 4.8125 9.5 4.8125C9.95703 4.8125 10.3438 5.19922 10.3438 5.65625V10.1562C10.3438 10.6484 9.95703 11 9.5 11C9.07812 11 8.65625 10.6484 8.65625 10.1562V5.65625ZM9.5 14.375C8.86719 14.375 8.375 13.8828 8.375 13.2852C8.375 12.6875 8.86719 12.1953 9.5 12.1953C10.0977 12.1953 10.5898 12.6875 10.5898 13.2852C10.5898 13.8828 10.0977 14.375 9.5 14.375Z"
									fill="#FEA013"
								/>
							</svg>
							<div className="font-bold text-lg">{errorData.heading}</div>
						</div>
						<div className="text-base">{errorData.message}</div>
					</div>
				</Modal>
			)}
		</div>
	);
};
