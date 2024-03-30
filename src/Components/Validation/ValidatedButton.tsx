import React from "react";
import Button from "../Base/Button";
import { useFormikContext } from "formik";

// default empty function if one is not passed
const empty = () => {};

function ValidatedButton({ title, onPress = empty, style }: any) {
  const { handleSubmit } = useFormikContext();

  return (
    <Button
      title={title}
      style={style}
      onPress={(e: any) => {
        handleSubmit(e);
        onPress(e);
      }}
    />
  );
}

export default ValidatedButton;
