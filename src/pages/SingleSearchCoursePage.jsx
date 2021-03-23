import { useQuery } from 'react-query';
import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import { Box, Heading, Text } from '@chakra-ui/react';
import ScaleLoader from 'react-spinners/ScaleLoader';

function SingleSearchCoursePage() {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery(
    ['singleCourse', id],
    async () => {
      try {
        const res = await axios.get(
          `https://freecourseyard-backend.glitch.me/singlesearch/${id}`
        );
        // console.log(res.data.result);
        return res.data.result;
      } catch (error) {
        console.log(error);
      }
    }
  );
  return (
    <>
      <NavBar />
      <Box
        d="flex"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
        my="6"
        minH="70vh"
      >
        {isLoading ? (
          <Box
            d="flex"
            flexWrap="wrap"
            justifyContent="center"
            alignItems="center"
            my="6"
            h="60vh"
          >
            <ScaleLoader
              color="#63B3ED"
              loading={isLoading}
              height={45}
              width={6}
              radius={2}
              margin={2}
            />
          </Box>
        ) : !data || isError ? (
          <Box textAlign="center">
            <Heading fontSize="5xl" m="2">
              Oops!
            </Heading>
            <Text fontSize="md" m="1">
              Unable to get Data :
            </Text>
            <Text fontSize="sm" m="1">
              Please try again in few minutes later
            </Text>
          </Box>
        ) : (
          <>
            <CourseCard {...data} id={data._id} imageurl={data.imageUrl} />
          </>
        )}
      </Box>
      <Footer />
    </>
  );
}

export default SingleSearchCoursePage;
