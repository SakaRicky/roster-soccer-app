import React from "react";

interface ImageAttributes {
	imgURL: string;
	jerseyNumber: string;
	name: string;
	position: string;
}
export const Image = ({
	imgURL,
	jerseyNumber,
	name,
	position,
}: ImageAttributes) => {
	const style = {
		background:
			"linear-gradient(rgba(45, 45, 45, 0) 40%, rgba(0, 0, 0, 0.9) 90%)",
	};
	return (
		<div className="">
			<div className="relative">
				<img
					src={imgURL}
					alt="player"
					className="h-[30vh] w-full object-contain"
				/>
				<div
					style={style}
					className="h-full w-full text-5xl font-bold text-orange absolute top-0 left-0 flex flex-col justify-between text-left"
				>
					<div className="mt-8 ml-4">{jerseyNumber}</div>
					<div className="">
						<div className="text-heading text-2xl">{name}</div>
						<div className="text-lg">{position}</div>
					</div>
				</div>
			</div>
		</div>
	);
};
