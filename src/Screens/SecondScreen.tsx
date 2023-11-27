import React from "react";
import { View } from "react-native";
import { Layout, Text } from "react-native-rapi-ui";
import Header from "../Components/Header";

export default function ({ navigation }: any) {
  return (
    <Layout>
      <Header />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* This text using ubuntu font */}
        <Text fontWeight="bold">This is the second screen</Text>
      </View>
    </Layout>
  );
}
