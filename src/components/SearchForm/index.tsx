import React, { ChangeEvent, useState } from "react";
import { setTeam, useStateValue, setFilteredTeam } from "../../state";
import { TextInput } from "../Form";

export const SearchForm = () => {
	const [state, dispatch] = useStateValue();
	const [textToSearch, setTextToSearch] = useState<string>("");
	const [isTyping, setisTyping] = useState<boolean>(false);
	const [searched, setSearched] = useState<boolean>(false);

	const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
		setisTyping(true);
		setSearched(false);
		setTextToSearch(e.target.value);
	};

	const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const filteredTeam = state.team?.filter(player => {
			return (
				player.name.toLowerCase().includes(textToSearch) ||
				player.position.toLowerCase().includes(textToSearch)
			);
		});
		if (filteredTeam && filteredTeam.length > 0) {
			console.log("setting filtered");
			dispatch(setFilteredTeam(filteredTeam));
			setSearched(true);
		}
	};

	const clearSearch = () => {
		setSearched(false);
		setisTyping(false);
		setTextToSearch("");
		dispatch(setFilteredTeam(undefined));
	};

	// Used keydown instead of submit because default html
	const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
		if (e.key === "Escape") {
			setTextToSearch("");
			setisTyping(false);
			setSearched(false);
		}
	};

	let searchOrCancelIcon;

	if (isTyping) {
		searchOrCancelIcon = (
			<button className="border-none text-orange" type="submit">
				Search
			</button>
		);
	}

	if (searched) {
		searchOrCancelIcon = (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-6 w-6 text-normal"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				strokeWidth={2}
				onClick={clearSearch}
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M6 18L18 6M6 6l12 12"
				/>
			</svg>
		);
	}

	return (
		<div className="relative">
			<div className="absolute text-normal flex items-center inset-y-0 left-0 pl-2">
				<svg
					className="w-5 h-5 text-gray-500 dark:text-gray-400"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					></path>
				</svg>
			</div>
			<form onSubmit={handleSearch}>
				<TextInput
					name="search"
					value={textToSearch}
					search
					textToSearch={textToSearch}
					handleTextChange={handleTextChange}
					handleKeyDown={handleKeyDown}
					placeholder={"find Player"}
				/>
				<div className="absolute flex items-center inset-y-0 right-0 pr-3">
					{searchOrCancelIcon}
				</div>
			</form>
		</div>
	);
};
