/**
 *  Form field for the Formik form.
 *  Encapsulates the TextInput and the ErrorMessages.
 */
import React from "react";
import IconTextInput, { IconTextInputProps } from "../Base/IconTextInput";
import ErrorMessage from "./ErrorMessage";
import { useFormikContext } from "formik";
import { StyleProp, TextInput, TextInputProps } from "react-native";

interface FormProps {
  name: string;
  width?: string;
  oncChangeText?: () => void;
  style?: StyleProp<TextInput>;
}

type FormFieldProps = FormProps & IconTextInputProps;

function FormField({
  name,
  width,
  onChangeText,
  style,
  ...otherProps
}: FormFieldProps) {
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext();

  return (
    <>
      <IconTextInput
        onChangeText={handleChange(name)}
        onBlur={() => setFieldTouched(name)}
        width={width}
        style={style}
        {...otherProps}
      />
      {/* 
            // @ts-ignore */}
      {errors && <ErrorMessage error={errors[name]} visible={touched[name]} />}
    </>
  );
}

export default FormField;
