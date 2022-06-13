/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-mixed-spaces-and-tabs */
import { ModalState, Player } from "../types";
import { State } from "./state";
import { dispatchStateType } from "./stateTypes";

export type Action =
	| {
			type: dispatchStateType.SET_PLAYER;
			payload: Player;
	  }
	| {
			type: dispatchStateType.SET_TEAM;
			payload: Player[];
	  }
	| {
			type: dispatchStateType.SET_MODAL;
			payload: ModalState;
	  }
	| {
			type: dispatchStateType.SET_FILTERED_TEAM;
			payload: Player[] | undefined;
	  }
	| {
			type: dispatchStateType.SET_TEAM_NAME;
			payload: string;
	  };

export const setPlayer = (player: Player): Action => {
	return { type: dispatchStateType.SET_PLAYER, payload: player };
};

export const setTeam = (team: Player[]): Action => {
	return { type: dispatchStateType.SET_TEAM, payload: team };
};

export const setFilteredTeam = (filteredTeam: Player[] | undefined): Action => {
	return { type: dispatchStateType.SET_FILTERED_TEAM, payload: filteredTeam };
};

export const setModal = (modal: ModalState): Action => {
	return { type: dispatchStateType.SET_MODAL, payload: modal };
};

export const setHeader = (teamName: string): Action => {
	return { type: dispatchStateType.SET_TEAM_NAME, payload: teamName };
};

// type checking as we don't know which payload will enter the reducer
// as it can be Player, Player[] or showModal
const isPlayer = (obj: any): obj is Player => {
	return obj.name !== undefined || obj.name !== null;
};

const isTeam = (obj: any): obj is Player[] => {
	return obj[0] !== undefined || obj[0] !== null;
};

export const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case dispatchStateType.SET_PLAYER:
			if (isPlayer(action.payload)) {
				return {
					...state,
					player: action.payload,
				};
			}
			return state;

		case dispatchStateType.SET_TEAM:
			if (isTeam(action.payload)) {
				return {
					...state,
					team: action.payload,
				};
			}
			return state;

		case dispatchStateType.SET_FILTERED_TEAM:
			if (action.payload === undefined) {
				return {
					...state,
					filteredTeam: undefined,
				};
			} else {
				if (isTeam(action.payload)) {
					return {
						...state,
						filteredTeam: action.payload,
					};
				}
				return state;
			}

		case dispatchStateType.SET_MODAL:
			if ("show" in action.payload) {
				return {
					...state,
					modal: action.payload,
				};
			}
			return state;

		case dispatchStateType.SET_TEAM_NAME:
			if (typeof action.payload === "string") {
				return {
					...state,
					teamName: action.payload,
				};
			}
			return state;
		default:
			return state;
	}
};
