import {
  Box,
  Button,
  Checkbox,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  Textarea,
  useColorMode,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { MdNewReleases, MdLink, MdAddCircle } from 'react-icons/md';
import { RiArrowDownSFill } from 'react-icons/ri';
import { useMutation } from 'react-query';
function AddCourse({ cardTitle, isSuggestCourse }) {
  const toast = useToast();
  // form state
  const [title, setTitle] = useState('');
  const [instructor, setInstructor] = useState('');
  const [courseUrl, setCourseUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');

  // form error state
  const [errTitle, setErrTitle] = useState(false);
  const [errInstructor, setErrInstructor] = useState(false);
  const [errCourseUrl, setErrCourseUrl] = useState(false);
  const [errImageUrl, setErrImageUrl] = useState(false);
  const [errDescription, setErrDescription] = useState(false);

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
      setTitle('');
      setInstructor('');
      setCourseUrl('');
      setImageUrl('');
      setDescription('');
      setCheckedArray([]);

      setErrTitle('');
      setErrInstructor('');
      setErrCourseUrl('');
      setErrImageUrl('');
      setErrDescription('');
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

  const onInputChangeHandeler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    switch (name) {
      case 'title': {
        setTitle(value);
        break;
      }
      case 'instructor': {
        setInstructor(value);
        break;
      }
      case 'courseUrl': {
        setCourseUrl(value);
        break;
      }
      case 'imageUrl': {
        setImageUrl(value);
        break;
      }
      case 'description': {
        setDescription(value);
        break;
      }
      default: {
        console.log('default case');
      }
    }
  };

  const onCheckHandeler = (e) => {
    console.log(e.target.name);
    if (checkedArray.includes(e.target.name)) {
      const a = checkedArray.filter((item) => item !== e.target.name);
      setCheckedArray(a);
      return;
    }
    checkedArray.push(e.target.name);
  };

  const onSubmitHandeler = (e) => {
    e.preventDefault();

    const value = {
      title,
      instructor,
      courseUrl,
      imageUrl,
      description,
      catagories: checkedArray,
    };
    console.log(value);
    if (!validate(value)) return;
    console.log(value);
    // send form data to server
    mutation.mutate(value);
  };

  const validate = (value) => {
    for (let [key, val] of Object.entries(value)) {
      if ((key === 'catagories' || key === 'imageUrl') && isSuggestCourse)
        continue;

      if (!isSuggestCourse && key === 'catagories') {
        if (val.length < 1) {
          alert('Please select catagorie');
          return false;
        }
        continue;
      }

      if (val.trim() === '') {
        if (key === 'title') setErrTitle(true);
        else if (key === 'instructor') setErrInstructor(true);
        else if (key === 'courseUrl') setErrCourseUrl(true);
        else if (key === 'imageUrl') setErrImageUrl(true);
        else if (key === 'description') setErrDescription(true);
        return false;
      } else {
        if (key === 'title') setErrTitle(false);
        else if (key === 'instructor') setErrInstructor(false);
        else if (key === 'courseUrl') setErrCourseUrl(false);
        else if (key === 'imageUrl' && !isSuggestCourse) setErrImageUrl(false);
        else if (key === 'description') setErrDescription(false);
      }
    }
    return true;
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
          <form onSubmit={onSubmitHandeler}>
            <Stack spacing="5">
              <CustomeInput
                placeHolder="Course Title"
                icon={<MdNewReleases />}
                name="title"
                onChange={onInputChangeHandeler}
                value={title}
                invalid={errTitle}
              />
              <CustomeInput
                placeHolder="Instructor Name"
                icon={<MdNewReleases />}
                name="instructor"
                onChange={onInputChangeHandeler}
                value={instructor}
                invalid={errInstructor}
              />
              <CustomeInput
                placeHolder="Course Url"
                icon={<MdLink />}
                name="courseUrl"
                onChange={onInputChangeHandeler}
                value={courseUrl}
                invalid={errCourseUrl}
              />
              {!isSuggestCourse && (
                <CustomeInput
                  placeHolder="Image Url"
                  icon={<MdLink />}
                  name="imageUrl"
                  onChange={onInputChangeHandeler}
                  value={imageUrl}
                  invalid={errImageUrl}
                />
              )}
              <Textarea
                placeholder="Description (within 30 words)"
                bg="white"
                color="black"
                _placeholder={{ color: 'gray.500' }}
                name="description"
                onChange={onInputChangeHandeler}
                value={description}
                isRequired={errDescription}
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

function CustomeInput({ name, placeHolder, onChange, invalid, icon, value }) {
  return (
    <InputGroup>
      <InputLeftElement children={icon} color="black" />
      <Input
        size="md"
        variant="outline"
        placeholder={placeHolder}
        type="text"
        bg="white"
        errorBorderColor="red.400"
        color="black"
        name={name}
        value={value}
        onChange={onChange}
        isInvalid={invalid}
        _placeholder={{ color: 'gray.500' }}
        isRequired
      />
    </InputGroup>
  );
}

export default AddCourse;
