import React from 'react';
import AddCourse from '../components/AddCourse';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';

function SuggestCoursePage() {
  return (
    <div>
      <NavBar />
      <AddCourse isSuggestCourse={true} cardTitle="Suggest Course" />
      <Footer />
    </div>
  );
}

export default SuggestCoursePage;
