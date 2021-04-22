import {
  Box,
  Button,
  Checkbox,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useColorMode,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { MdNewReleases, MdLink, MdAddCircle } from 'react-icons/md';
import { RiArrowDownSFill } from 'react-icons/ri';
import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addCourseSchema } from '../util/YupSchema';
import CustomInput from './CustomInput';
import CustomTextArea from './CustomTextArea';

function AddCourse({ cardTitle, isSuggestCourse }) {
  const toast = useToast();

  const [checkedArray, setCheckedArray] = useState([]);

  const toastTypeSuccess = {
    title: isSuggestCourse ? 'Course Suggest' : 'Course Added',
    description: `Courses ${
      isSuggestCourse ? 'suggest' : 'added'
    } successfully`,
    status: 'success',
    duration: 2000,
    isClosable: true,
    position: 'bottom-right',
  };
  const toastTypeError = {
    title: 'Error',
    description: 'Something wrong happend',
    status: 'error',
    duration: 2000,
    isClosable: true,
    position: 'bottom-right',
  };

  const mutation = useMutation(async (formData) => {
    // console.log(formData);
    try {
      const res = await axios.post(
        `https://freecourseyard-backend.glitch.me/addcourse`,
        formData
      );
      console.log(res.data);

      toast(toastTypeSuccess);
      setTimeout(function () {
        window.location.reload(false);
      }, 1000);
    } catch (error) {
      toast(toastTypeError);
      setTimeout(function () {
        window.location.reload(false);
      }, 1000);
    }
  });

  const onCheckHandeler = (e) => {
    console.log(e.target.name);
    if (checkedArray.includes(e.target.name)) {
      const a = checkedArray.filter((item) => item !== e.target.name);
      setCheckedArray(a);
      return;
    }
    checkedArray.push(e.target.name);
  };

  //* react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addCourseSchema),
  });

  const submitHandeler = (data) => {
    if (checkedArray.length <= 0) {
      alert('Choose a catagory');
      return;
    }
    //  console.log({ ...data, catagories: checkedArray });
    mutation.mutate({ ...data, catagories: checkedArray });
  };

  const { colorMode } = useColorMode();
  const bgColor = colorMode === 'light' ? 'gray.300' : 'gray.900';

  const catagorieItems = [
    'WebDevelopment',
    'AppDevelopment',
    'ComputerScienceFundamental',
    'ProgrammingLanguages',
  ];
  return (
    <>
      <Flex minH="80vh" justify="center" align="center" my="6">
        <Box bg={bgColor} px="6" py="4" w="55vw" minW="300px" rounded="lg">
          <Text fontSize="3xl" fontWeight="semibold" mb="4" textAlign="center">
            {cardTitle}
          </Text>
          <form onSubmit={handleSubmit(submitHandeler)}>
            <Stack spacing="5" w="100%">
              <CustomInput
                placeholder="Course Title"
                leftElement={<MdNewReleases />}
                name="title"
                errors={errors}
                register={register}
              />
              <CustomInput
                placeholder="Instructor Name"
                leftElement={<MdNewReleases />}
                name="instructor"
                errors={errors}
                register={register}
              />
              <CustomInput
                placeholder="Course Url"
                leftElement={<MdLink />}
                name="courseUrl"
                errors={errors}
                register={register}
              />
              {!isSuggestCourse && (
                <CustomInput
                  placeholder="Image Url"
                  leftElement={<MdLink />}
                  name="imageUrl"
                  errors={errors}
                  register={register}
                />
              )}
              <CustomTextArea
                placeholder="Description (within 30 words)"
                name="description"
                errors={errors}
                register={register}
              />
              {!isSuggestCourse && (
                <Menu placement="top-end" closeOnSelect={false} closeOnBlur>
                  <MenuButton
                    as={Button}
                    rightIcon={<RiArrowDownSFill />}
                    bg="gray.500"
                    textAlign="left"
                  >
                    Catagories
                  </MenuButton>
                  <MenuList maxH="250px" zIndex={20}>
                    {catagorieItems.map((item, index) => (
                      <MenuItem key={index}>
                        <Checkbox
                          name={item}
                          width="100%"
                          onChange={onCheckHandeler}
                        >
                          {item}
                        </Checkbox>
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              )}
              <Button
                isLoading={mutation.isLoading}
                loadingText={isSuggestCourse ? 'suggesting' : 'adding'}
                type="submit"
                bg="blue.500"
                mb="4"
                rightIcon={<MdAddCircle />}
              >
                {isSuggestCourse ? 'Suggest' : 'Add'}
              </Button>
            </Stack>
          </form>
        </Box>
      </Flex>
    </>
  );
}

export default AddCourse;
