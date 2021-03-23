import React from 'react';
import AddCourse from '../components/AddCourse';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';

function AddCoursesPage() {
  return (
    <>
      <NavBar />
      <AddCourse cardTitle="Add Course" />
      <Footer />
    </>
  );
}

export default AddCoursesPage;
