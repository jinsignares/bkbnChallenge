import { object } from "yup";
import * as yup from 'yup'
import { emptyStringToNull } from "../helpers/yupHelpers";

export const contactSchema = object({
    firstName: yup.string().min(1, 'First name is required'),
    lastName: yup.string().min(1, 'Last name is required'),
    email: yup.string().min(1, 'Email is required').email('Email is invalid'),
    phone: yup.string().transform(emptyStringToNull).nullable().required('Phone is required').typeError('Phone must be a number'),
});