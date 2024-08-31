import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Store<T> = {
	data: T | null;
    loadData: () => Promise<void>;
	setData: (value: T) => void;
	removeData: () => void;
	isLoading: boolean;
};

export const useDataStore = <T>(
	key: string,
	initialValue: T | null = null,
): Store<T> => {
	const [data, setDataState] = useState<T | null>(initialValue);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		loadData();
	}, []);

    // Load the data from AsyncStorage
    const loadData = useCallback(async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(key);
            if (jsonValue != null) {
                setDataState(JSON.parse(jsonValue) as T);
            } else {
                setDataState(initialValue);
            }
        } catch (e) {
            console.error("Error loading data", e);
        } finally {
            setIsLoading(false);
        }
    }, [key, initialValue]);

	// Function to update the data both in state and AsyncStorage
	const setData = useCallback(
		async (value: T) => {
			try {
				const jsonValue = JSON.stringify(value);
				await AsyncStorage.setItem(key, jsonValue);
				setDataState(value);
			} catch (e) {
				console.error("Error saving data", e);
			}
		},
		[key],
	);

	// Function to remove the data from both state and AsyncStorage
	const removeData = useCallback(async () => {
		try {
			await AsyncStorage.removeItem(key);
			setDataState(null);
		} catch (e) {
			console.error("Error removing data", e);
		}
	}, [key]);

	return {
		data,
        loadData,
		setData,
		removeData,
		isLoading,
	};
};
