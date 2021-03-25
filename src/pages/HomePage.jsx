import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';

function HomePage() {
  const { colorMode } = useColorMode();
  return (
    <>
      <NavBar />
      <Flex justify="space-around" align="center" flexWrap="wrap" mb="6">
        <Flex justify="center" flexDirection="column" textAlign="left" p="6">
          <Box mb="3">
            <Heading size="3xl" color="blue.500" d="inline">
              Dream
            </Heading>
            <Heading size="3xl" color="cyan.300" d="inline" ml="2">
              Up
            </Heading>
          </Box>
          <Text color={colorMode === 'light' ? 'black' : 'grey'}>
            Learn new things. Level up your skills. Dream BIG.
          </Text>
        </Flex>
        <Flex justify="center">
          <Box p="6">
            <Image
              src="https://bit.ly/3viTU1L"
              w={{ base: '350px', md: '350px', lg: '450px' }}
              h={{ base: '220px', md: '250px', lg: '350px' }}
              objectFit="cover"
              borderRadius="8px"
            />
          </Box>
        </Flex>
      </Flex>
      <Flex justify="space-around" align="center" wrap="wrap" mt="20" mb="20">
        <Box
          d="flex"
          justifyContent="center"
          p="6"
          order={{ base: '1', md: '0' }}
        >
          <Image
            src="https://i.ibb.co/XkHQwpf/3784896.jpg"
            w={{ base: '350px', md: '350px', lg: '450px' }}
            h={{ base: '200px', md: '250px', lg: '350px' }}
            objectFit="cover"
            borderRadius="8px"
          />
        </Box>
        <Box order={{ base: '0', md: '1' }}>
          <Box mb="3" p="6" textAlign="right">
            <Heading size="3xl" color="blue.500" mb="3">
              Courses
            </Heading>
            <Text color={colorMode === 'light' ? 'black' : 'grey'}>
              Check all courses page. To find your suitable one.
            </Text>
            <Link to="/allcourses">
              <Button
                colorScheme="blue"
                variant="solid"
                size="sm"
                mt="4"
                w="150px"
              >
                All Courses
              </Button>
            </Link>
          </Box>
        </Box>
      </Flex>
      <Heading size="3xl" color="blue.500" textAlign="center">
        Top Catagories
      </Heading>
      <Flex justify="space-around" p="6" wrap="wrap">
        <CatagorieCard
          name="Web Development"
          url="https://i.ibb.co/Hh2g5Mm/4884785.jpg"
          catagoriName="Web Development"
          siteId="WebDevelopment"
        />
        <CatagorieCard
          name="Fundametal Computer science"
          url="https://i.ibb.co/4gS4hT2/Laptop-with-program-code-isometric-icon-software-development-and-programming-applications-dark-neon.jpg"
          catagoriName="ComputerScience Fundamental"
          siteId="ComputerScienceFundamental"
        />

        <CatagorieCard
          name="App Development"
          url="https://i.ibb.co/Mh0DjSz/4428861.jpg"
          catagoriName="App Development"
          siteId="AppDevelopment"
        />
      </Flex>
      <Footer />
    </>
  );
}

// https://i.ibb.co/Hh2g5Mm/4884785.jpg || Web Development

function CatagorieCard({ name, url, catagoriName, siteId }) {
  const { colorMode } = useColorMode();
  const bgDark = colorMode === 'light' ? 'gray.200' : 'gray.600';
  return (
    <Box m="3" _hover={{ boxShadow: '2xl' }} textAlign="center">
      <Link to={`/catagories/${siteId}/`}>
        <Box w="250px" h="350px" bg={bgDark} rounded="xl">
          <Image
            src={url}
            alt={name}
            height="150px"
            width="250px"
            objectFit="cover"
          />
          <Box p="6">
            <Text fontSize="20px" fontWeight="semibold">
              {name}
            </Text>
          </Box>
        </Box>
      </Link>
    </Box>
  );
}

export default HomePage;
