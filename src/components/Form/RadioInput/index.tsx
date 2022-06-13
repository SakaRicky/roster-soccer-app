import React, { useState } from "react";

interface RadioInputAttributes {
	options: string[];
	title: string;
	value: string;
	handleRadioChange: (starter: string) => void;
}
export const RadioInput = ({
	options,
	title,
	value,
	handleRadioChange,
}: RadioInputAttributes) => {
	const [Checked, setChecked] = useState<string>(value);

	const onRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(e.target.value);
		handleRadioChange(e.target.value);
	};

	// console.log("checked: ", Checked);

	return (
		<div className="block text-normal text-left my-4">
			<div>{title}</div>
			<div className="mt-2 flex gap-4">
				{options.map(option => {
					return (
						<div key={option} className="flex items-center gap-2">
							<input
								type="radio"
								className="h-4 w-4 hidden"
								name="starter"
								id={option}
								checked={Checked === option}
								value={option}
								onChange={e => onRadioChange(e)}
							/>
							<span className="w-5 h-5 inline-block rounded-full border border-disabled flex-no-shrink"></span>
							<label htmlFor={option}>{option}</label>
						</div>
					);
				})}
			</div>
		</div>
	);
};
