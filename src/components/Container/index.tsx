import React from "react";
import { Sidenav } from "./Sidenav";

interface ContainerAttributes {
	children: JSX.Element;
}
export const Container = ({ children }: ContainerAttributes) => {
	return (
		<div className="flex ">
			<Sidenav />
			<div className="flex-1">{children}</div>
		</div>
	);
};
