import React from "react";

interface NumberInputAttributes {
	name: string;
	value: number;
	label: string;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const NumberInput = ({
	name,
	value,
	label,
	handleChange,
}: NumberInputAttributes) => {
	const border = isNaN(value) ? "border-red" : "border-disabled";
	return (
		<div className="my-4">
			<label htmlFor={name} className="block text-left mb-2">
				{label}
			</label>
			<input
				type="number"
				name={name}
				id={name}
				value={value}
				onChange={handleChange}
				className={`bg-dark border-2 ${border} rounded-lg w-full py-[12px] px-[16px] focus:outline-none focus:shadow-outline`}
			/>
		</div>
	);
};
