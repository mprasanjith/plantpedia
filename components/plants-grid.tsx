import React, { useMemo } from "react";
import { FlatList, View } from "react-native";
import { PlantTile } from "./plant-tile";
import { useSpottedPlants } from "~/hooks/usePlants";
import { Text } from "./ui/text";
import { Link } from "expo-router";
import { Button } from "./ui/button";
import { MissingTile } from "./missing-tile";

export const PlantpediaGrid = () => {
	const { plantIds } = useSpottedPlants();

	const plantIdsWithMissingGroups: (
		| { type: "missing_group"; start: number; end: number }
		| { type: "plant"; value: string }
	)[] = useMemo(() => {
		const result = [];

		if (!plantIds || plantIds.length === 0) {
			return [];
		}

		// Start from 0 to the first value minus one
		if (plantIds[0] > 0) {
			result.push({
				type: "missing_group",
				start: 0,
				end: plantIds[0] - 1,
			});
		}

		// Loop through the array
		for (let i = 0; i < plantIds.length; i++) {
			result.push({
				type: "plant",
				value: plantIds[i],
			});

			// If it's not the last element, create a missing range between current and next
			if (i < plantIds.length - 1 && plantIds[i] + 1 < plantIds[i + 1]) {
				result.push({
					type: "missing_group",
					start: plantIds[i] + 1,
					end: plantIds[i + 1] - 1,
				});
			}
		}

		return result;
	}, [plantIds]);

	return (
		<FlatList
			data={plantIdsWithMissingGroups}
			renderItem={({ item }) =>
				item.type === "plant" ? (
					<PlantTile plantId={item.value} />
				) : (
					<MissingTile startIndex={item.start} endIndex={item.end} />
				)
			}
			keyExtractor={(item) =>
				item.type === "missing_group" ? `${item.start}-${item.end}` : item.value
			}
			horizontal={false}
			numColumns={3}
			initialNumToRender={15}
			maxToRenderPerBatch={10}
			windowSize={5}
			removeClippedSubviews={true}
			className="bg-white"
			contentContainerClassName="p-1"
			ListEmptyComponent={
				<View className="flex-col justify-center items-center mt-4 w-full h-96 text-center text-gray-500">
					<View className="mb-2">
						<Text className="font-light text-xl">Capture the first plant</Text>
					</View>
					<View>
						<Text>Let's start your Plantpedia journey</Text>
						<Link href="/capture" asChild>
							<Button
								variant="default"
								className="flex flex-row items-center gap-2 my-6 mt-4"
								size="lg"
							>
								<Text>Capture a photo</Text>
							</Button>
						</Link>
					</View>
				</View>
			}
		/>
	);
};
