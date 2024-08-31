import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { type Theme, ThemeProvider } from "@react-navigation/native";
import { SplashScreen, Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { NAV_THEME } from "~/lib/constants";
import "~/global.css";
import { RootSiblingParent } from "react-native-root-siblings";
import { PortalHost } from "@rn-primitives/portal";
import { tokenCache } from "~/lib/tokens";

const LIGHT_THEME: Theme = {
	dark: false,
	colors: NAV_THEME.light,
};

if (!process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY) {
	throw new Error(
		"Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env",
	);
}
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function RootLayout() {
	return (
		<RootSiblingParent>
			<ThemeProvider value={LIGHT_THEME}>
				<StatusBar style={"light"} />
				<ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
					<ClerkLoaded>
						<Slot />
					</ClerkLoaded>
				</ClerkProvider>
			</ThemeProvider>

			<PortalHost />
		</RootSiblingParent>
	);
}

// Catch any errors in the router and display a fallback screen.
export { ErrorBoundary } from "expo-router";

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();
