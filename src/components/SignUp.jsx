import { Box, Button, Stack, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useContext } from 'react';
import { MdEmail, MdNewReleases } from 'react-icons/md';
import { useMutation } from 'react-query';
import { Redirect } from 'react-router-dom';
import { setUserContext, userContext } from '../App';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpSchema, logInSchema } from '../util/YupSchema';
import CustomInput from './CustomInput';
import CustomPasswordInput from './CustomPasswordInput';
import {
  toastTypeErrorOnLogIn,
  toastTypeErrorOnSignUP,
  toastTypeSuccessOnLogIn,
  toastTypeSuccessOnSignUP,
} from '../util/ToastTypes';

function SignUp({ isLogin }) {
  const user = useContext(userContext);
  const setUser = useContext(setUserContext);

  const urlPoint = isLogin ? 'login' : 'signup';
  const toast = useToast();

  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(isLogin ? logInSchema : signUpSchema),
  });

  const mutation = useMutation(async (formData) => {
    // console.log(formData);
    try {
      const res = await axios.post(
        `https://freecourseyard-backend.glitch.me/${urlPoint}`,
        formData
      );
      // console.log(res.data);
      if (isLogin && res.data.token) {
        localStorage.setItem('token', res.data.token);
        setUser({ token: res.data.token });
        // console.log(userContext.token);
      }
      if (!isLogin)
        toast({ ...toastTypeSuccessOnSignUP, description: res.data.status });
      else {
        res.data.code && res.data.code === '404'
          ? toast({
              ...toastTypeSuccessOnLogIn,
              description: res.data.status,
              status: 'error',
              title: 'Verify Email',
            })
          : toast({ ...toastTypeSuccessOnLogIn, description: res.data.status });
      }
      return;
    } catch (error) {
      console.log('error');
      if (!isLogin) toast(toastTypeErrorOnSignUP);
      else toast(toastTypeErrorOnLogIn);
      return;
    }
  });

  const submitHandeler = (data) => {
    // console.log(data);
    // send data to server
    if (!isLogin) mutation.mutate(data);
    else mutation.mutate(data);
  };

  // console.log(isLogin);
  if (user.token) return <Redirect to="/" />;

  return (
    <Box my="4">
      <Text fontSize="4xl" fontWeight="semibold" mb="4" textAlign="center">
        {isLogin ? 'Log In' : 'Sign Up'}
      </Text>
      <form onSubmit={handleSubmit(submitHandeler)}>
        <Stack spacing="4" alignItems="center">
          {!isLogin && (
            <CustomInput
              name="fullName"
              placeholder="Full Name"
              errors={errors}
              leftElement={<MdNewReleases />}
              register={register}
            />
          )}
          <CustomInput
            name="email"
            placeholder="Email"
            errors={errors}
            leftElement={<MdEmail />}
            register={register}
          />
          <CustomPasswordInput
            name="password"
            placeholder="Password"
            errors={errors}
            register={register}
          />
          <Button
            bg="blue.400"
            isLoading={mutation.isLoading}
            loadingText={isLogin ? 'Loging in' : 'Signing Up'}
            isFullWidth
            type="submit"
          >
            {isLogin ? 'LOG IN' : 'SIGN UP'}
          </Button>
        </Stack>
      </form>
    </Box>
  );
}

export default SignUp;
