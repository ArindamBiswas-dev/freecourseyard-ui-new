import { Box, Button, Heading, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import CourseCard from '../components/CourseCard';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useQuery } from 'react-query';
import { fetchAllCourse } from '../hooks/useFetchCourse';
import ScaleLoader from 'react-spinners/ScaleLoader';

function AllCoursesPage() {
  const [page, setPage] = useState(0);

  const { isLoading, isError, data, isFetching } = useQuery(
    ['courses', page],
    () => fetchAllCourse(page),
    {
      keepPreviousData: true,
    }
  );
  if (isFetching) window.scrollTo(0, 0);
  return (
    <>
      <NavBar />

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
      ) : isError ? (
        <Box
          d="flex"
          flexDirection="column"
          flexWrap="wrap"
          justifyContent="center"
          alignItems="center"
          my="6"
          h="60vh"
        >
          <Heading fontSize="5xl" m="2">
            Oops!
          </Heading>
          <Text fontSize="md" m="1">
            Unable to get Data :(
          </Text>
          <Text fontSize="sm" m="1">
            Please try again in few minutes later
          </Text>
        </Box>
      ) : (
        <>
          <Box d="flex" flexWrap="wrap" justifyContent="space-around" my="6">
            {data[0].map((item, index) => (
              <CourseCard
                key={item._id}
                title={item.title}
                imageurl={item.imageUrl}
                instructor={item.instructor}
                courseUrl={item.courseUrl}
                description={item.description}
                id={item._id}
              />
            ))}
          </Box>
          <Box d="flex" justifyContent="center" mb="6">
            <Button
              colorScheme="blue"
              variant="outline"
              mr="3"
              leftIcon={<FaArrowLeft />}
              onClick={() => setPage((prev) => prev - 1)}
              isDisabled={page === 0}
            >
              Prev page
            </Button>
            <Button
              colorScheme="blue"
              variant="outline"
              ml="3"
              rightIcon={<FaArrowRight />}
              onClick={() => setPage((prev) => prev + 1)}
              isDisabled={page === Math.ceil(data[1] / 4) - 1}
            >
              Next page
            </Button>
          </Box>
        </>
      )}
      <Footer />
    </>
  );
}

export default AllCoursesPage;
