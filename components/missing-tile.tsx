import React from "react";
import { Text } from "react-native";
import { Card, CardContent } from "~/components/ui/card";

interface MissingTileProps {
	startIndex: number;
	endIndex: number;
}

export const MissingTile = ({ startIndex, endIndex }: MissingTileProps) => {
	return (
		<Card className="bg-gray-100 m-1 w-[30%] aspect-square">
			<CardContent className="justify-center items-center p-2 h-28">
				<Text className="text-2xl text-gray-500">{endIndex - startIndex}</Text>
				<Text className="mt-1 text-center text-xs">Missing</Text>
			</CardContent>
		</Card>
	);
};
