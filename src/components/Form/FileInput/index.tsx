/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

interface FileInputAttributes {
	error?: boolean;
	handleSetFile: (f: any) => void;
}
export const FileInput = ({ error, handleSetFile }: FileInputAttributes) => {
	const border = error ? "border-red" : "border-muted";
	const fileBorder = error ? "file:border-red" : "file:border-muted";

	const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files?.length) {
			return;
		}
		handleSetFile(e.target.files[0]);
	};
	return (
		<input
			type="file"
			onChange={handleFileInput}
			className={`
					file:bg-dark
					file:text-normal 
					file:p-4
					file:border-2
					${fileBorder}
					file:rounded-lg
					file:cursor-pointer
					file:mr-8
					file:mt-[-2px]
					file:ml-[-2px]
					file:mb-[-2px]
					border
					${border}
					flex 
					cursor-pointer
					rounded-lg
					text-normal
				`}
		/>
	);
};
