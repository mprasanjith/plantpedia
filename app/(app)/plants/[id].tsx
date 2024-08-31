import React, { useState } from "react";
import {
	View,
	Text,
	Image,
	ScrollView,
	TouchableOpacity,
	Share,
} from "react-native";
import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { MapPin } from "~/lib/icons/MapPin";
import { Edit } from "~/lib/icons/Edit";
import { Share as ShareIcon } from "~/lib/icons/Share";
import { Input } from "~/components/ui/input";
import Stack from "expo-router/stack";

const PlantDetailScreen = () => {
	const plant = {
		id: "1",
		name: "Plant 1",
		image: "https://example.com/plant1.jpg",
		scientificName: "Plant 1 Scientific Name",
		family: "Plant 1 Family",
		nativeTo: "Plant 1 Native To",
		type: "Plant 1 Type",
		careLevel: "Plant 1 Care Level",
		userPhoto: "https://example.com/plant1-user-photo.jpg",
		location: "Plant 1 Location",
		userNote: "Plant 1 User Note",
	};

	const [isEditing, setIsEditing] = useState(false);

	const handleShare = async () => {
		try {
			await Share.share({
				message: `Check out this ${plant.name} I found using Plantpedia!`,
				url: plant.image, // This might not work on all platforms, consider using a deep link instead
			});
		} catch (error) {
			console.error("Error sharing:", error);
		}
	};

	return (
		<ScrollView className="flex-1 bg-white">
			<Stack.Screen
				options={{
					title: plant.name,
				}}
			/>

			<Image source={{ uri: plant.image }} className="w-full h-64" />

			<View className="p-4">
				<Text className="mb-2 font-bold text-3xl">{plant.name}</Text>
				<Text className="mb-4 text-gray-600 text-lg">
					{plant.scientificName}
				</Text>

				<Card className="mb-4">
					<CardContent className="p-4">
						<Text className="mb-2 font-semibold">Plant Information</Text>
						<Text className="mb-1">Family: {plant.family}</Text>
						<Text className="mb-1">Native to: {plant.nativeTo}</Text>
						<Text className="mb-1">Type: {plant.type}</Text>
						<Text>Care Level: {plant.careLevel}</Text>
					</CardContent>
				</Card>

				<Card className="mb-4">
					<CardContent className="p-4">
						<View className="flex-row justify-between items-center mb-2">
							<Text className="font-semibold">User Capture</Text>
							<TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
								<Edit size={20} color="#4B5563" />
							</TouchableOpacity>
						</View>
						<Image
							source={{ uri: plant.userPhoto }}
							className="mb-2 rounded-md w-full h-40"
						/>
						<View className="flex-row items-center mb-2">
							<MapPin size={16} color="#4B5563" />
							<Text className="ml-1">{plant.location}</Text>
						</View>
						{isEditing ? (
							<Input
								multiline
								numberOfLines={4}
								className="border-gray-300 p-2 border rounded-md"
								value={plant.userNote}
								onChangeText={(text) => {
									/* Update note logic here */
								}}
							/>
						) : (
							<Text>{plant.userNote}</Text>
						)}
					</CardContent>
				</Card>

				<Button
					onPress={handleShare}
					className="flex-row justify-center items-center bg-green-600"
				>
					<ShareIcon size={20} color="white" className="mr-2" />
					<Text className="font-semibold text-white">Share</Text>
				</Button>
			</View>
		</ScrollView>
	);
};

export default PlantDetailScreen;
