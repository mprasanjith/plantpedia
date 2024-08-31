import {
	createContext,
	useContext,
	useState,
	useEffect,
	useCallback,
	type ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Store<T> = {
	data: T | null;
	loadData: () => Promise<void>;
	setData: (value: T) => void;
	removeData: () => void;
	isLoading: boolean;
};

type DataContextProps<T> = Store<T>;

const DataContext = createContext<DataContextProps<any> | undefined>(undefined);

type DataProviderProps<T> = {
	children: ReactNode;
	storageKey: string;
	initialValue: T | null;
};

export const DataProvider = <T,>({
	children,
	storageKey,
	initialValue,
}: DataProviderProps<T>) => {
	const [data, setDataState] = useState<T | null>(initialValue);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const loadData = useCallback(async () => {
		try {
			const jsonValue = await AsyncStorage.getItem(storageKey);
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
	}, [storageKey, initialValue]);

	const setData = useCallback(
		async (value: T) => {
			try {
				const jsonValue = JSON.stringify(value);
				await AsyncStorage.setItem(storageKey, jsonValue);
				setDataState(value);
			} catch (e) {
				console.error("Error saving data", e);
			}
		},
		[storageKey],
	);

	const removeData = useCallback(async () => {
		try {
			await AsyncStorage.removeItem(storageKey);
			setDataState(null);
		} catch (e) {
			console.error("Error removing data", e);
		}
	}, [storageKey]);

	useEffect(() => {
		loadData();
	}, [loadData]);

	return (
		<DataContext.Provider
			value={{ data, loadData, setData, removeData, isLoading }}
		>
			{children}
		</DataContext.Provider>
	);
};

export const useGlobalDataStore = <T,>(): Store<T> => {
	const context = useContext(DataContext);
	if (!context) {
		throw new Error("useDataStore must be used within a DataProvider");
	}
	return context as Store<T>;
};
