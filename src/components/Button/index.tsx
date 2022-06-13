/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

export interface ButtonAttributes {
	name: string;
	disabled?: boolean;
	neutral?: boolean;
	danger?: boolean;
	noBG?: boolean;
	submit?: boolean;
	handleClick?: (...args: any[]) => void;
}

export const Button = ({
	name,
	disabled,
	neutral,
	danger,
	noBG,
	submit,
	handleClick,
}: ButtonAttributes) => {
	if (disabled) {
		return (
			<button
				disabled
				className="bg-disabled rounded-lg text-muted border-none px-4 py-2 cursor-default"
			>
				{name}
			</button>
		);
	}

	if (danger) {
		return (
			<button
				className="bg-red rounded-lg px-4 py-2 cursor-pointer"
				onClick={handleClick}
			>
				{name}
			</button>
		);
	}

	if (neutral) {
		return (
			<button
				className="bg-dark hover:bg-veryDark hover:text-heading rounded-lg border border-disabled px-4 py-2 cursor-pointer"
				onClick={handleClick}
			>
				{name}
			</button>
		);
	}

	// used for the 2nd import
	if (noBG) {
		return (
			<button
				className="block mx-auto bg-none border-none text-orange mt-2"
				onClick={handleClick}
			>
				{name}
			</button>
		);
	}

	return (
		<button
			className="text-heading bg-orange hover:bg-hover py-2 px-4 rounded-lg"
			onClick={handleClick}
			type={submit ? "submit" : "button"}
		>
			{name}
		</button>
	);
};
