import React from "react";

interface TableHeadAttributes {
	empty?: boolean;
}
export const TableHead = ({ empty }: TableHeadAttributes) => {
	return (
		<thead className="relative">
			<tr className="sticky top-0 left-0 bg-[#2D2D2D]">
				<th scope="col" className="px-4 py-3">
					Player Name
				</th>
				<th scope="col" className="px-4 py-3">
					Jersey Number
				</th>
				<th scope="col" className="px-4 py-3">
					Starter
				</th>
				<th scope="col" className="px-4 py-3">
					Position
				</th>
				<th scope="col" className="px-4 py-3">
					Height
				</th>
				<th scope="col" className="px-4 py-3">
					Weight
				</th>
				<th scope="col" className="px-4 py-3">
					Nationality
				</th>
				{!empty && (
					<th scope="col" className="px-4 py-3">
						Appearances
					</th>
				)}
				{!empty && (
					<th scope="col" className="px-4 py-3">
						Minutes Plyed
					</th>
				)}
			</tr>
		</thead>
	);
};
