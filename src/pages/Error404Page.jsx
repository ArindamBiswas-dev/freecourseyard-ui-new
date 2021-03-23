import { Button, Flex, Heading } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';

function Error404Page() {
  window.scrollTo(0, 0);
  return (
    <>
      <NavBar />
      <Flex h="80vh" justify="center" align="center" direction="column">
        <Heading>Page not Found ! :(</Heading>
        <Link to="/">
          <Button variant="solid" colorScheme="blue" mt="6">
            Go to Home Page
          </Button>
        </Link>
      </Flex>
      <Footer />
    </>
  );
}

export default Error404Page;
