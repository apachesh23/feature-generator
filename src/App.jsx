import { useState } from 'react'
import ExperienceList from './components/ExperienceList/index';
import UX4 from './components/UX4/index';
import PageSelect from './components/PageSelect';
import './App.css'
import { useSelector } from 'react-redux';


const App = () => {
  const selectedPage = useSelector((state) => state.page.selectedPage); // Учитываем структуру редюсера

  const renderPage = () => {
    switch (selectedPage) {
      case 'ExperienceList':
        return <ExperienceList />;
      case 'UX4':
        return <UX4 />;
      default:
        return null;
    }
  };

  return (
    <>
      <PageSelect />
      {renderPage()}
    </>
  );
};

export default App;