import { useEffect, useState } from "react";
import * as Location from "expo-location";

export const useLocation = () => {
	const [location, setLocation] = useState<Location.LocationObject | null>(null);
	const [errorMsg, setErrorMsg] = useState<string | null>(null);

    console.log(location, errorMsg);

	useEffect(() => {
		(async () => {
			const { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
				return;
			}

			const location = await Location.getCurrentPositionAsync({});
			setLocation(location);
		})();
	}, []);

	return { location, errorMsg };
};
