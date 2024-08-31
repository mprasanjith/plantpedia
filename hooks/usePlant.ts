import type { Spotting } from "~/lib/types";
import { useDataStore } from "./useDataStore";

export const useSpotting = (plantId: string) => {
	const { isLoading, data } = useDataStore<Spotting>(`plant-${plantId}`);

	return {
		isLoading,
		spotting: data || null,
	};
};
