import * as yup from 'yup';

const fieldRequired = `This field is Required!`;
const canOnlyContain = `can only contains alphabates`;
const signUpSchema = yup.object().shape({
  fullName: yup
    .string()
    .trim()
    .required(fieldRequired)
    .matches(/^[a-z ,.'-]+$/i, `Name ${canOnlyContain}`),
  email: yup
    .string()
    .email('Email is not valid')
    .trim()
    .required(fieldRequired),
  password: yup
    .string()
    .trim()
    .required(fieldRequired)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
      `Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character required`
    ),
});

const logInSchema = yup.object().shape({
  email: yup
    .string()
    .email('Email is not valid')
    .trim()
    .required(fieldRequired),
  password: yup
    .string()
    .trim()
    .required(fieldRequired)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
      `Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character required`
    ),
});

const addCourseSchema = yup.object().shape({
  title: yup.string().trim().required(fieldRequired),
  instructor: yup.string().trim().required(fieldRequired),
  courseUrl: yup.string().trim().required(fieldRequired),
  imageUrl: yup.string().trim().required(fieldRequired),
  description: yup.string().trim().required(fieldRequired),
});

export { signUpSchema, logInSchema, addCourseSchema };
