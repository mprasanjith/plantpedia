import React, { useMemo, useState } from "react";
import { View, FlatList, Image, Animated } from "react-native";
import { Link, useRouter } from "expo-router";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import { Input } from "~/components/ui/input";
import Stack from "expo-router/stack";
import {
	GestureHandlerRootView,
	Swipeable,
} from "react-native-gesture-handler";
import { useAuth } from "@clerk/clerk-expo";
import { PlantpediaGrid } from "~/components/plants-grid";


const PlantsListScreen = () => {
	const [searchQuery, setSearchQuery] = useState("");

	return (
		<GestureHandlerRootView className="flex-1">
			<View className="flex-1 p-4">
				<Stack.Screen
					options={{
						title: "My plants",
						// headerRight: () => (
						// 	<Link href="/capture" asChild>
						// 		<Button
						// 			size="sm"
						// 			variant="ghost"
						// 			className="flex-row items-center gap-2 p-0"
						// 		>
						// 			<Text>Catch a plant</Text>
						// 			{/* <Plus /> */}
						// 		</Button>
						// 	</Link>
						// ),
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
