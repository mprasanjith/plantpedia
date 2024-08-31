import { Link } from "expo-router";
import React from "react";
import { Image, Text } from "react-native";
import { Card, CardContent } from "~/components/ui/card";
import { useSpotting } from "~/hooks/usePlant";

interface PlantTileProps {
	plantId: string;
}

export const PlantTile = ({ plantId }: PlantTileProps) => {
	const { spotting } = useSpotting(plantId);

	if (!spotting) {
		return null;
	}

	return (
		<Link href={`/plants/${spotting.id}`} asChild>
			<Card className="m-1 w-[30%] aspect-square">
				<CardContent className="items-center p-1">
					<Image
						source={{ uri: spotting.image }}
						className="rounded-full w-16 h-16"
					/>
					<Text
						numberOfLines={1}
						className="mt-1 font-mono text-center text-gray-500 text-xs"
					>
						#{spotting.id}
					</Text>
					<Text numberOfLines={1} className="text-center text-xs">
						{spotting.commonName}
					</Text>
				</CardContent>
			</Card>
		</Link>
	);
};
