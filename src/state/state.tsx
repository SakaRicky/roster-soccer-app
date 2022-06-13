import React, { createContext, useReducer, useContext } from "react";
import { ModalState, Player } from "../types";
import { Action, reducer } from "./reducer";

export type State = {
	player: Player | undefined;
	team: Player[] | undefined;
	filteredTeam: Player[] | undefined;
	modal: ModalState;
	teamName: string;
};

const initialState: State = {
	player: undefined,
	team: undefined,
	filteredTeam: undefined,
	modal: { show: false, form: "" },
	teamName: "My Team",
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
	initialState,
	() => initialState,
]);

type StateProp = {
	children: React.ReactElement;
};

export const StateProvider: React.FC<StateProp> = ({ children }: StateProp) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<StateContext.Provider value={[state, dispatch]}>
			{children}
		</StateContext.Provider>
	);
};

export const useStateValue = () => useContext(StateContext);
