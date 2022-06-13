export type Player = {
	name: string;
	image: string;
	jerseyNumber: string;
	position: string;
	height: number;
	weight: number;
	nationality: string;
	flagImage: string;
	starter: string;
	appearances: string;
	minutesPlayed: string;
	goals: string;
	assists: string;
	cleanSheets: string;
	saves: string;
};

export enum Position {
	goalkeeper = "Goalkeeper",
	defender = "Defender",
	midfielder = "Midfielder",
	forward = "Forward",
}

export type Nationality = {
	name: string;
	value: string;
};

export type ModalState = { show: boolean; form: string };

export enum ButtonType {
	primiray,
	secondary,
	dark,
}
