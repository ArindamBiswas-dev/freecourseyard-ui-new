import axios from 'axios';

const fetchAllCourse = async (page = 0) => {
  const res = await axios.get(
    `https://freecourseyard-backend.glitch.me/?page=${page}`
  );
  // console.log(res.data.data);
  return [res.data.data, res.data.count];
};

const fetchFavCourse = async () => {
  const res = await axios.get(
    `https://freecourseyard-backend.glitch.me/favorites?token=${localStorage.getItem(
      'token'
    )}`
  );
  // console.log(res.data.data);
  return res.data.data;
};

const fetchSearchCourse = async (page = 0, id) => {
  const res = await axios.get(
    `https://freecourseyard-backend.glitch.me/search/${id}?page=${page}`
  );
  console.log(res);
  return [res.data.data, res.data.count];
};

const fetchAllCourseCatagoriwise = async (page = 0, catagoriName) => {
  const res = await axios.get(
    `https://freecourseyard-backend.glitch.me/catagory/:${catagoriName}?page=${page}`
  );
  // console.log(res.data.data);
  return [res.data.data, res.data.count];
};

export {
  fetchAllCourse,
  fetchFavCourse,
  fetchSearchCourse,
  fetchAllCourseCatagoriwise,
};

// https://freecourseyard-backend.glitch.me/?page
