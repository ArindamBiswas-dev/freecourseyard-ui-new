import { Box, Heading, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import CourseCard from '../components/CourseCard';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import { useQuery } from 'react-query';
import { fetchFavCourse } from '../hooks/useFetchCourse';
import ScaleLoader from 'react-spinners/ScaleLoader';

function AllCoursesPage() {
  const { isLoading, isError, data } = useQuery('FavCourses', () =>
    fetchFavCourse()
  );

  window.scrollTo(0, 0);

  useEffect(() => {}, [data]);

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
            {data.map((item, index) => (
              <CourseCard
                key={item._id}
                title={item.title}
                imageurl={item.imageUrl}
                instructor={item.instructor}
                courseUrl={item.courseUrl}
                description={item.description}
                id={item._id}
                allFav={true}
              />
            ))}
          </Box>
        </>
      )}
      <Footer />
    </>
  );
}

export default AllCoursesPage;
