import React from "react";
import { Nationality, Position } from "../../../types";

interface SelectInputAttributes {
	disabled?: boolean;
	options: string[];
	label: string;
	name: string;
	value?: string;
	handleSelectChange: (event: React.FormEvent<HTMLSelectElement>) => void;
}

export const SelectInput = ({
	disabled,
	options,
	label,
	name,
	value,
	handleSelectChange,
}: SelectInputAttributes) => {
	const bg = disabled ? "bg-disabled" : "bg-dark";

	return (
		<>
			<label htmlFor="select" className="block text-left mb-2">
				{label}
			</label>
			<div className="relative text-normal w-full">
				<select
					className={`block appearance-none border-2 w-full border-disabled ${bg} py-3 px-4 pr-8 rounded-lg focus:outline-none focus:bg-white`}
					id={name}
					onChange={handleSelectChange}
					value={value}
				>
					{options.map(option => {
						return <option key={option}>{option}</option>;
					})}
				</select>
				<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M19 9l-7 7-7-7"
						/>
					</svg>
				</div>
			</div>
		</>
	);
};
