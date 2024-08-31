import { Link, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { View, Image } from "react-native";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import { Text } from "~/components/ui/text";

const WelcomeScreen = () => {
	const navigation = useNavigation();
	useEffect(() => {
		navigation.setOptions({ headerShown: false });
	}, [navigation]);

	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				padding: 16,
			}}
		>
			<Card style={{ width: "100%", maxWidth: 350 }}>
				<CardHeader>
					<CardTitle>Welcome to Plantpedia</CardTitle>
					<CardDescription>
						Discover the wonderful world of plants
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Image
						source={{ uri: "/assets/images/login-image.svg" }}
						style={{ width: "100%", height: 200, borderRadius: 8 }}
					/>
					<Text className="mt-4">
						Embark on an exciting journey through the lush landscapes of
						botanical wonders.
					</Text>
				</CardContent>
				<CardFooter className="flex flex-col justify-center items-stretch gap-4 w-full">
					<Link href="/sign-up" asChild>
						<Button className="w-full">
							<Text>Get Started</Text>
						</Button>
					</Link>
					<Link href="/sign-in" asChild>
						<Button variant="secondary" className="w-full">
							<Text>I already have an account</Text>
						</Button>
					</Link>
				</CardFooter>
			</Card>
		</View>
	);
};

export default WelcomeScreen;
