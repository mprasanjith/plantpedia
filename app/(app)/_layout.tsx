import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { Stack } from "expo-router/stack";
import { DataProvider } from "~/hooks/useGlobalDataStore";

export default function Layout() {
	const { isSignedIn } = useAuth();

	if (!isSignedIn) {
		return <Redirect href={"/"} />;
	}

	return (
		<DataProvider key="spotted-ids" initialValue={[]}>
			<Stack />
		</DataProvider>
	);
}
