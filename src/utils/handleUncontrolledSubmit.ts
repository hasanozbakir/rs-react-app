// import { useActionState } from "react";
// import { useDispatch } from "react-redux";
// import { setUncontrolledFormData } from "../features/uncontrolledForm/uncontrolledFormSlice";
// import { formSchema } from "./formSchema";

// async function handleFormSubmit(previousState: any, formData: FormData) {
//   const formValues = {
//     name: formData.get("name"),
//     age: Number(formData.get("age")),
//     email: formData.get("email"),
//     password: formData.get("password"),
//     confirmPassword: formData.get("confirmPassword"),
//     gender: formData.get("gender"),
//     terms: formData.get("terms") === "on",
//     picture: formData.get("picture"),
//     country: formData.get("country"),
//   };

//   try {
//     await formSchema.validate(formValues, { abortEarly: false });

//     return formValues;
//   } catch (error: any) {
//     return { errors: error.inner.map((err: any) => err.message) };
//   }
// }
