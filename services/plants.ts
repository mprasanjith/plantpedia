import { ApiClient } from "~/lib/api";
import type { PlantInfo } from "~/lib/types";

export async function identifyPlant(image: string) {
	const apiClient = new ApiClient();
	const blob = await fetch(image).then((res) => res.blob());
	const formData = new FormData();
	formData.append("file", blob, "plant.jpg");

	return (
		await apiClient.formData<{ data: PlantInfo | null }>("/identify", formData)
	).data;
}
