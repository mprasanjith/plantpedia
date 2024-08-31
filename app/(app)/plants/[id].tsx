import {
	View,
	Text,
	Image,
	ScrollView,
	Share,
	TouchableOpacity,
} from "react-native";
import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Share as ShareIcon } from "~/lib/icons/Share";
import { Leaf } from "~/lib/icons/Leaf";
import { Repeat } from "~/lib/icons/Repeat";
import { Home } from "~/lib/icons/Home";
import { Activity } from "~/lib/icons/Activity";
import { Edit } from "~/lib/icons/Edit";
import { MapPin } from "~/lib/icons/MapPin";
import type { Spotting } from "~/lib/types";
import { useState } from "react";
import { Input } from "~/components/ui/input";
import { Stack, useLocalSearchParams } from "expo-router";
import { useSpotting } from "~/hooks/usePlant";

const plant: Spotting = {
	id: 1,
	commonName: "Plant 1",
	image: "https://example.com/plant1.jpg",
	thumbnail: "https://example.com/plant1-thumbnail.jpg",
	scientificName: "Plant 1 Scientific Name",
	type: "Plant 1 Type",
	cycle: "Plant 1 Cycle",
	indoor: true,
	description: "Plant 1 Description",
	careLevel: "Plant 1 Care Level",
	locationLatitude: 0,
	locationLongitude: 0,
	userPhoto: "https://example.com/plant1-user-photo.jpg",
	location: "Plant 1 Location",
	userNote: "Plant 1 User Note",
};

const PlantDetailScreen: React.FC = () => {
	const { id } = useLocalSearchParams();
	const { isLoading, spotting: plant } = useSpotting(id as string);
	const [isEditing, setIsEditing] = useState(false);
	const [userNote, setUserNote] = useState("");

	const handleShare = async () => {
		try {
			await Share.share({
				message: `Check out ${plant.commonName} (${plant.scientificName}) on Plantpedia!`,
				url: plant.image, // Consider using a deep link to your app instead
			});
		} catch (error) {
			console.error("Error sharing:", error);
		}
	};

	if (isLoading || !plant) {
		return null;
	}

	return (
		<ScrollView className="flex-1 bg-white">
			<Stack.Screen
				options={{
					title: plant.commonName,
				}}
			/>

			<Image source={{ uri: plant.image }} className="w-full h-64" />

			<View className="p-4">
				<Text className="mb-2 font-bold text-3xl">{plant.commonName}</Text>
				<Text className="mb-4 text-gray-600 text-lg">
					{plant.scientificName}
				</Text>

				<Card className="mb-4">
					<CardContent className="p-4">
						<Text className="mb-2 font-semibold">Plant Information</Text>
						<View className="flex-row items-center mb-2">
							<Leaf size={20} className="mr-2 text-green-600" />
							<Text>Type: {plant.type}</Text>
						</View>
						<View className="flex-row items-center mb-2">
							<Repeat size={20} className="mr-2 text-blue-600" />
							<Text>Cycle: {plant.cycle}</Text>
						</View>
						<View className="flex-row items-center mb-2">
							<Home size={20} className="mr-2 text-purple-600" />
							<Text>Indoor: {plant.indoor ? "Yes" : "No"}</Text>
						</View>

						<View className="flex-row items-center mb-2">
							<Activity size={20} className="mr-2 text-red-600" />
							<Text>Care Level: {plant.careLevel}</Text>
						</View>
					</CardContent>
				</Card>

				<Card className="mb-4">
					<CardContent className="p-4">
						<Text className="mb-2 font-semibold">Description</Text>
						<Text>{plant.description}</Text>
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
							<Text className="ml-1">{plant.locationLatitude}, {plant.locationLongitude}</Text>
						</View>
						{isEditing ? (
							<Input
								multiline
								numberOfLines={4}
								className="border-gray-300 p-2 border rounded-md h-48"
								value={userNote}
								onChangeText={setUserNote}
							/>
						) : (
							<Text>{userNote}</Text>
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
