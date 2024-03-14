/**
 *  Form field for the Formik form.
 *  Encapsulates the TextInput and the ErrorMessages.
 */
import React from "react";
import IconTextInput from "../Base/IconTextInput";
import ErrorMessage from "./ErrorMessage";
import { useFormikContext } from "formik";

function FormField({ name, width, onChangeText, style, ...otherProps }: any) {
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

      {errors && <ErrorMessage error={errors[name]} visible={touched[name]} />}
    </>
  );
}

export default FormField;
