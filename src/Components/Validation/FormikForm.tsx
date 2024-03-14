/**
 *  Encapsulated version of a Formik form.
 *  Takes care of validation.
 */

import React from "react";
import { Formik } from "formik";

function FormikForm({
  initialValues,
  onSubmit,
  validationSchema,
  children,
}: any) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => <>{children}</>}
    </Formik>
  );
}

export default FormikForm;
