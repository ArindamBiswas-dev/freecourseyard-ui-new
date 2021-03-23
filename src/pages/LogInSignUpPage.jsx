import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorMode,
} from '@chakra-ui/react';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import SignUp from '../components/SignUp';

function LogInSignUpPage({ defaultIndex }) {
  const { colorMode } = useColorMode();

  window.scrollTo(0, 0);
  return (
    <>
      <NavBar />
      <Flex align="center" justify="center" minH="80vh" my="6">
        <Box
          w="30vw"
          minW="300px"
          h="450px"
          p="4"
          bg={colorMode === 'light' ? 'gray.300' : 'gray.900'}
          boxShadow="lg"
          rounded="lg"
        >
          <Tabs isFitted variant="enclosed" defaultIndex={defaultIndex}>
            <TabList mb="1em">
              <Tab
                fontWeight="semibold"
                _selected={{ color: 'white', bg: 'blue.500' }}
              >
                SIGN UP
              </Tab>
              <Tab
                fontWeight="semibold"
                border="2px solid blue"
                _selected={{ color: 'white', bg: 'blue.500' }}
              >
                LOG IN
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <SignUp isLogin={false} />
              </TabPanel>
              <TabPanel>
                <SignUp isLogin={true} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
      <Footer />
    </>
  );
}

export default LogInSignUpPage;
