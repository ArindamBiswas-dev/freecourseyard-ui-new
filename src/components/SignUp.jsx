import {
  Box,
  Button,
  IconButton,
  Input,
  InputLeftElement,
  InputRightElement,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { InputGroup } from '@chakra-ui/react';
import axios from 'axios';
import { useContext, useState } from 'react';
import { MdEmail, MdNewReleases, MdLock } from 'react-icons/md';
import { RiEyeFill, RiEyeCloseFill } from 'react-icons/ri';
import { useMutation } from 'react-query';
import { Redirect } from 'react-router-dom';
import { setUserContext, userContext } from '../App';

function SignUp({ isLogin }) {
  const user = useContext(userContext);
  const setUser = useContext(setUserContext);

  const urlPoint = isLogin ? 'login' : 'signup';
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const toastTypeSuccessOnSignUP = {
    title: 'Account created.',
    description: 'Check your email to verify your account',
    status: 'success',
    duration: 6000,
    isClosable: true,
    position: 'bottom-right',
  };
  const toastTypeErrorOnSignUP = {
    title: 'User Exists.',
    description: 'User already exists, Please LogIn',
    status: 'error',
    duration: 6000,
    isClosable: true,
    position: 'bottom-right',
  };
  const toastTypeSuccessOnLogIn = {
    title: 'Logged In',
    description: 'Logged In successfully',
    status: 'success',
    duration: 6000,
    isClosable: true,
    position: 'bottom-right',
  };
  const toastTypeErrorOnLogIn = {
    title: 'User does not Exists.',
    description: 'User does not Exists, pleases create account',
    status: 'error',
    duration: 6000,
    isClosable: true,
    position: 'bottom-right',
  };
  const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errName, setErrName] = useState(false);
  const [errEmail, setErrEmail] = useState(false);
  const [errPassword, setErrPassword] = useState(false);

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
      setName('');
      setEmail('');
      setPassword('');
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

  const validate = () => {
    if (!isLogin && name.trim() === '') {
      setErrName(true);
      return false;
    } else {
      setErrName(false);
    }
    if (email.trim() === '' && !email.match(emailPattern)) {
      setErrEmail(true);
      return false;
    } else {
      setErrEmail(false);
    }
    if (password.trim() === '') {
      setErrPassword(true);
      return false;
    } else {
      setErrPassword(false);
    }
    return true;
  };

  const handelSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;
    setLoading(!loading);
    // send form data to server
    if (!isLogin) mutation.mutate({ name, email, password });
    else mutation.mutate({ email, password });
    // console.log(mutation);
  };

  const onHandelChange = (name, e) => {
    const value = e.target.value;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      default:
        setPassword(value);
        break;
    }
  };
  // console.log(isLogin);
  if (user.token) return <Redirect to="/" />;

  return (
    <Box my="4">
      <Text fontSize="4xl" fontWeight="semibold" mb="4" textAlign="center">
        {isLogin ? 'Log In' : 'Sign Up'}
      </Text>
      <form onSubmit={handelSubmit}>
        <Stack spacing="4" alignItems="center">
          {!isLogin && (
            <InputGroup>
              <InputLeftElement children={<MdNewReleases />} color="black" />
              <Input
                size="md"
                variant="outline"
                placeholder="Full Name"
                type="text"
                bg="white"
                value={name}
                onChange={(e) => onHandelChange('name', e)}
                isInvalid={errName}
                errorBorderColor="red.400"
                color="black"
                _placeholder={{ color: 'gray.500' }}
                required
              />
            </InputGroup>
          )}
          <InputGroup>
            <InputLeftElement children={<MdEmail />} color="black" />
            <Input
              size="md"
              variant="outline"
              placeholder="Email"
              type="email"
              bg="white"
              value={email}
              onChange={(e) => onHandelChange('email', e)}
              isInvalid={errEmail}
              errorBorderColor="red.400"
              color="black"
              _placeholder={{ color: 'gray.500' }}
              required
            />
          </InputGroup>
          <InputGroup>
            <InputLeftElement children={<MdLock />} color="black" />
            <Input
              size="md"
              variant="outline"
              placeholder="Password"
              type={showPassword ? 'text' : 'password'}
              bg="white"
              mb="4"
              value={password}
              onChange={(e) => onHandelChange('password', e)}
              isInvalid={errPassword}
              errorBorderColor="red.400"
              color="black"
              _placeholder={{ color: 'gray.500' }}
              required
            />
            <InputRightElement width="4.5rem">
              <IconButton
                aria-label="Search database"
                variant="unstyled"
                _focus={{ outline: 'none' }}
                h="1.75rem"
                size="sm"
                bg="transparent"
                ml="10"
                icon={showPassword ? <RiEyeFill /> : <RiEyeCloseFill />}
                onClick={() => setShowPassword(!showPassword)}
                color="black"
                required
              />
            </InputRightElement>
          </InputGroup>
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
