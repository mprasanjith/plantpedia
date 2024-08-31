import React, { useState } from "react";
import { View } from "react-native";
import { Input } from "~/components/ui/input";
import Stack from "expo-router/stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PlantpediaGrid } from "~/components/plants-grid";
import { Link } from "expo-router";
import { Button } from "~/components/ui/button";
import { ScanEye } from "~/lib/icons/ScanEye";
import { Text } from "~/components/ui/text";

const PlantsListScreen = () => {
	const [searchQuery, setSearchQuery] = useState("");

	return (
		<GestureHandlerRootView className="flex-1">
			<View className="flex-1 p-4">
				<Stack.Screen
					options={{
						title: "My plants",
						headerRight: () => (
							<Link href="/capture" asChild>
								<Button
									size="sm"
									variant="ghost"
									className="flex-row items-center gap-2"
								>
									<Text>Capture</Text>
									<ScanEye />
								</Button>
							</Link>
						),
					}}
				/>

				<Input
					placeholder="Search plants..."
					value={searchQuery}
					onChangeText={setSearchQuery}
					className="mb-4"
				/>

				<PlantpediaGrid />
			</View>
		</GestureHandlerRootView>
	);
};

export default PlantsListScreen;
