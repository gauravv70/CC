import React from "react";
import { View } from "react-native";

interface props {
  width?: string;
}

export default function Line(props: props) {
  return (
    <View
      style={{
        marginTop: 20,
        height: 2,
        backgroundColor: "#293241",
        alignSelf: "center",
        width: props.width ? props.width : "100%",
      }}
    />
  );
}
