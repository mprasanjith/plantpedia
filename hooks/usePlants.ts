import type { Spotting } from "~/lib/types";
import { useDataStore } from "./useDataStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGlobalDataStore } from "./useGlobalDataStore";
import { useMemo } from "react";

export const useSpottedPlants = () => {
	const { data, setData, isLoading } = useGlobalDataStore<string[]>();

	const sortedPlantIds = useMemo(() => {
		return data?.map((val) => Number.parseInt(val)).sort((a, b) => a - b);
	}, [data]);

	const addPlant = async (id: string, record: Spotting) => {
		const existingPlant = await AsyncStorage.getItem(`plant-${id}`);
		const isNew = existingPlant == null;

		if (isNew) {
			await AsyncStorage.setItem(`plant-${id}`, JSON.stringify(record));
			const currentData = data || [];
			setData([...currentData, id]);
		}
	};

	return {
		isLoading,
		plantIds: sortedPlantIds || [],
		addPlant,
	};
};
