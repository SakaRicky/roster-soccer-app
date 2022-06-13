import React from "react";
import { useStateValue } from "../../state";

interface ModalAttribute {
	children: JSX.Element;
}
export const Modal = ({ children }: ModalAttribute) => {
	const [state] = useStateValue();
	const display = state.modal.show ? "flex" : "hidden";
	return (
		<div
			className={`${display} flex flex-col items-center justify-center absolute inset-0 left-32 bg-dark bg-opacity-[0.5]`}
			// onClick={() => setShowModal(false)}
		>
			<div className="relative p-4 w-full max-w-2xl h-auto z-50">
				{/* <!-- Modal content --> */}
				<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
					{children}
				</div>
			</div>
		</div>
	);
};
