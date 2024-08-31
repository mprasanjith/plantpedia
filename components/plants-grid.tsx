import React, { useCallback, useMemo } from "react";
import { FlatList } from "react-native";
import { PlantTile } from "./plant-tile";

export const PlantpediaGrid = () => {
	// This would typically come from your data source
	const generatePlantData = useCallback((count: number) => {
		return Array.from({ length: count }, (_, index) => ({
			id: index.toString(),
			name: `Plant ${index + 1}`,
			image: `https://example.com/plant${index + 1}.jpg`,
			caught: Math.random() > 0.7, // 30% chance of being caught for demonstration
		}));
	}, []);

	const rawPlants = useMemo(
		() => generatePlantData(10000),
		[generatePlantData],
	);

	const groupedPlants = useMemo(() => {
		const result = [];
		let missingCount = 0;

		rawPlants.forEach((plant, index) => {
			if (plant.caught) {
				if (missingCount > 0) {
					result.push({
						type: "missing_group",
						count: missingCount,
						id: `missing_${index}`,
					});
					missingCount = 0;
				}
				result.push(plant);
			} else {
				missingCount++;
			}
		});

		if (missingCount > 0) {
			result.push({
				type: "missing_group",
				count: missingCount,
				id: "missing_last",
			});
		}

		return result;
	}, [rawPlants]);

	return (
		<FlatList
			data={groupedPlants}
			renderItem={({ item }) => <PlantTile item={item} />}
			keyExtractor={(item) => item.id}
			horizontal={false}
			numColumns={3}
			initialNumToRender={15}
			maxToRenderPerBatch={10}
			windowSize={5}
			removeClippedSubviews={true}
			className="bg-white"
			contentContainerClassName="p-1"
		/>
	);
};
