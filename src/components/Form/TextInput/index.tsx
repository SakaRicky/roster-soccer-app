import React from "react";

interface TextInputAttributes {
	name: string;
	value: string;
	placeholder: string;
	label?: string;
	disabled?: boolean;
	search?: boolean;
	textToSearch?: string;
	handleTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleKeyDown?: (e: React.KeyboardEvent<HTMLElement>) => void;
}

export const TextInput = ({
	name,
	value,
	placeholder,
	disabled,
	label,
	search,
	textToSearch,
	handleTextChange,
	handleKeyDown,
}: TextInputAttributes) => {
	const text_bg = disabled ? "bg-disabled" : "bg-dark";

	if (search) {
		return (
			<input
				type="text"
				placeholder={placeholder}
				className="
                    bg-dark
                    border-2
                    border-disabled
                    rounded-lg
                    p-2
                    pl-10
                    text-normal
                    outline-none
                "
				value={textToSearch}
				onChange={handleTextChange}
				onKeyDown={handleKeyDown}
			/>
		);
	}

	return (
		<div className="my-4">
			<label htmlFor={name} className="block text-left mb-2">
				{label}
			</label>
			<input
				disabled={disabled}
				id={name}
				className={`${text_bg} text-normal border-2 border-disabled rounded-lg w-full py-[12px] px-[16px] focus:outline-none focus:shadow-outline`}
				type="text"
				placeholder={placeholder}
				value={value}
				onChange={handleTextChange}
			/>
		</div>
	);
};
