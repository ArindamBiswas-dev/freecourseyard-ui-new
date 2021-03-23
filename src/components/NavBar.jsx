import { FaSun, FaMoon } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { BiMenuAltLeft } from 'react-icons/bi';
import { ImHome } from 'react-icons/im';
import { BsFillStarFill } from 'react-icons/bs';
import { MdAddCircle, MdEmail } from 'react-icons/md';
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  IconButton,
  List,
  ListIcon,
  ListItem,
  Text,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import AutoCompleteSearchBox from './AutoCompleteSearchBox';
import ProfileAvater from './ProfileAvater';
import { Link } from 'react-router-dom';

function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();

  const [input, setInput] = useState('');

  const onSubmitHandeler = (e) => {
    e.preventDefault();

    console.log(input);
    setInput('');
  };

  return (
    <Box pos="sticky" top="0" w="100%" zIndex="5" boxShadow="xl">
      <Heading
        py="2"
        size="lg"
        bg={colorMode === 'light' ? 'gray.300' : 'gray.900'}
        color="blue.500"
        borderBottom="1px solid white"
        display={{ base: 'block', sm: 'none' }}
        textAlign="center"
      >
        FREECOURSEYARD
      </Heading>
      <Flex
        bg={colorMode === 'light' ? 'gray.300' : 'gray.900'}
        px="6"
        py="4"
        justify="space-between"
        align="center"
      >
        <First />
        <Second onOpen={onOpen} />
      </Flex>
      <AutoCompleteSearchBox
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        input={input}
        setInput={setInput}
        onSubmitHandeler={onSubmitHandeler}
        d="block"
      />
    </Box>
  );
}

function First() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();
  const onHoverColor = colorMode === 'light' ? 'gray.400' : 'gray.600';
  return (
    <Flex align="center">
      <IconButton
        aria-label="menu"
        size="md"
        fontSize="x-large"
        icon={<BiMenuAltLeft />}
        onClick={onOpen}
      />
      <Heading
        color="blue.600"
        size="md"
        fontWeight="extrabold"
        ml="5"
        display={{ base: 'none', sm: 'block' }}
      >
        FREECOURSEYARD
      </Heading>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen} size="xs">
        <DrawerOverlay>
          <DrawerContent bg={colorMode === 'light' ? 'gray.300' : 'gray.900'}>
            <DrawerCloseButton
              bg="white"
              _hover={{ bg: 'white' }}
              color="black"
            />
            <DrawerHeader borderBottomWidth="2px" bg="blue.400">
              <Heading color="white" size="sm" fontWeight="extrabold">
                FREECOURSEYARD
              </Heading>
            </DrawerHeader>
            <DrawerBody p="0">
              <List spacing="3">
                <Link to="/">
                  <ListItem
                    d="flex"
                    alignItems="center"
                    px="3"
                    py="3"
                    borderBottom="1px solid gray"
                    _hover={{ bg: onHoverColor }}
                  >
                    <ListIcon as={ImHome} fontSize="22px" mr="4" />
                    <Text fontSize="lg" fontWeight="semibold">
                      Home
                    </Text>
                  </ListItem>
                </Link>
                <Link to="/allcourses">
                  <ListItem
                    d="flex"
                    alignItems="center"
                    px="3"
                    py="3"
                    borderBottom="1px solid gray"
                    _hover={{ bg: onHoverColor }}
                  >
                    <ListIcon as={BsFillStarFill} fontSize="22px" mr="4" />
                    <Text fontSize="lg" fontWeight="semibold">
                      All Courses
                    </Text>
                  </ListItem>
                </Link>
                <Link to="/suggestcourse">
                  <ListItem
                    d="flex"
                    alignItems="center"
                    px="3"
                    py="3"
                    borderBottom="1px solid gray"
                    _hover={{ bg: onHoverColor }}
                  >
                    <ListIcon as={MdAddCircle} fontSize="22px" mr="4" />
                    <Text fontSize="lg" fontWeight="semibold">
                      Suggest Course
                    </Text>
                  </ListItem>
                </Link>
                <a href="mailto:freecourseyard@gmail.com">
                  <ListItem
                    d="flex"
                    alignItems="center"
                    px="3"
                    py="3"
                    borderBottom="1px solid gray"
                    _hover={{ bg: onHoverColor }}
                  >
                    <ListIcon as={MdEmail} fontSize="22px" mr="4" />
                    <Text fontSize="lg" fontWeight="semibold">
                      Contact
                    </Text>
                  </ListItem>
                </a>
              </List>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Flex>
  );
}

function Second({ onOpen }) {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex
      justify="space-between"
      flexBasis={{ base: '45%', md: '30%' }}
      maxW="170px"
    >
      <IconButton
        aria-label="Search"
        size="md"
        icon={<FiSearch />}
        onClick={onOpen}
      />
      <IconButton
        aria-label="color mode"
        size="md"
        icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
        onClick={toggleColorMode}
      />
      <ProfileAvater />
    </Flex>
  );
}

export default NavBar;
