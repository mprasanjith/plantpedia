import { Link } from "expo-router";
import React from "react";
import { Image, Text } from "react-native";
import { Card, CardContent } from "~/components/ui/card";

export const PlantTile = ({ item }) => {
	if (item.type === "missing_group") {
		return (
			<Card className="flex-1 bg-gray-100 m-1">
				<CardContent className="justify-center items-center p-2 h-28">
					<Text className="text-2xl text-gray-500">{item.count}</Text>
					<Text className="mt-1 text-center text-xs">Missing</Text>
				</CardContent>
			</Card>
		);
	}

	return (
		<Link href={`/plants/${item.id}`} asChild>
			<Card className="flex-1 m-1">
				<CardContent className="items-center p-2">
					<Image
						source={{ uri: item.image }}
						className="rounded-full w-20 h-20"
					/>
					<Text numberOfLines={1} className="mt-1 text-center text-xs">
						{item.name}
					</Text>
				</CardContent>
			</Card>
		</Link>
	);
};
