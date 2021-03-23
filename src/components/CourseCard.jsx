import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Image,
  Stack,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { MdFavorite } from 'react-icons/md';
import { TiLocationArrow } from 'react-icons/ti';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { userContext } from '../App';

function CourseCard({
  title,
  instructor,
  courseUrl,
  imageurl,
  description,
  id,
  allFav,
}) {
  const [isFav, setFav] = useState(allFav ? true : false);
  const [isAlert, setAlert] = useState(false);

  const { colorMode } = useColorMode();

  const user = useContext(userContext);

  const onClickHandeler = async () => {
    if (!user.token) {
      console.log('login');
      setAlert(true);
      return;
    }
    setFav(!isFav);
    await axios.post(`https://freecourseyard-backend.glitch.me/setfavorite`, {
      token: user.token,
      courseId: id,
      addToFavorite: !isFav,
    });
    // console.log(res);
  };

  useQuery(['SingleCourse', id], async () => {
    if (user.token && !allFav) {
      try {
        axios
          .get(
            `https://freecourseyard-backend.glitch.me/isfavorite?token=${user.token}&courseId=${id}`
          )
          .then((res) => {
            if (res.data.status === 'ok') setFav(true);
          });
      } catch (err) {
        console.log(err);
      }
    }
  });

  return (
    <>
      <Box
        w="300px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="sm"
        bg={colorMode === 'light' ? 'gray.300' : 'gray.900'}
        transition="all .25s ease-in-out"
        _hover={{
          boxShadow: '2xl',
          transform: 'translateY(-5px)',
        }}
        mb="6"
        mx="3"
        mt="6"
      >
        <Image src={imageurl} objectFit="cover" height="200px" />
        <Box p="3" textAlign="left">
          <Stack spacing="3">
            <Flex>
              <Avatar name="Teacher" src="" bg="blue.200" w="40px" h="40px" />
              <Text
                fontWeight="medium"
                m="auto"
                ml="3"
                color={colorMode === 'light' ? 'gray.700' : 'gray.400'}
              >
                {instructor}
              </Text>
            </Flex>
            <Box h="40px">
              <Heading size="sm" noOfLines={2}>
                {title}
              </Heading>
            </Box>
            <Box h="80px">
              <Text
                fontSize="sm"
                color={colorMode === 'light' ? 'gray.600' : 'gray.500'}
                noOfLines={4}
              >
                {description}
              </Text>
            </Box>
            <Flex justify="space-between" align="baseline">
              <IconButton
                aria-label="favorite"
                isRound
                color={isFav ? '#00B5D8' : 'black'}
                bg="gray.50"
                icon={<MdFavorite />}
                size="md"
                onClick={onClickHandeler}
              />
              <a href={courseUrl} target="_blank" rel="noreferrer">
                <Button
                  rightIcon={<TiLocationArrow />}
                  colorScheme="blue"
                  variant="solid"
                  size="sm"
                  textAlign="end"
                >
                  Preview
                </Button>
              </a>
            </Flex>
          </Stack>
        </Box>
      </Box>
      <AlertDialogComonent
        isAlert={isAlert}
        onAlertClose={() => setAlert(false)}
      />
    </>
  );
}

function AlertDialogComonent({ isAlert, onAlertClose }) {
  const cancelRef = React.useRef();

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      isOpen={isAlert}
      leastDestructiveRef={cancelRef}
      onClose={onAlertClose}
      blockScrollOnMount={false}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Dear User
          </AlertDialogHeader>

          <AlertDialogBody>
            To use this feature, please Log In to FREECOURSEYARD.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onAlertClose}>
              Cancel
            </Button>
            <Link to="/login">
              <Button colorScheme="blue" ml={3}>
                Log In
              </Button>
            </Link>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

export default CourseCard;
