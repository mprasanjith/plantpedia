if (!process.env.EXPO_PUBLIC_API_BASE_URL) {
	throw new Error(
		"Missing EXPO_PUBLIC_API_BASE_URL environment variable. Please set it in your .env file.",
	);
}
const EXPO_PUBLIC_API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export class ApiClient {
	private baseUrl: string;

	constructor() {
		this.baseUrl = EXPO_PUBLIC_API_BASE_URL;
    }

	async formData<T>(endpoint: string, data: FormData): Promise<T> {
		const url = this.baseUrl + endpoint;
		const headers: HeadersInit = {};
		const config: RequestInit = {
			method: "POST",
			headers,
			body: data,
		};

		try {
			const response = await fetch(url, config);
			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || "An error occurred");
			}
			return await response.json();
		} catch (error) {
			console.error("API request failed:", error);
			throw error;
		}
	}
}
