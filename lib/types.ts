export interface PlantInfo {
	id: number;
	commonName: string;
	image: string;
	thumbnail: string;
	scientificName: string;
	type: string;
	cycle: string;
	indoor: boolean;
	description: string;
	careLevel: string;
}

export interface Spotting extends PlantInfo {
	userPhoto: string;
	location: string;
	locationLatitude: number;
	locationLongitude: number;
	userNote: string;
}