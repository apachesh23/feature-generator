import { useState } from 'react'
import ExperienceList from './ExperienceList';
import UX4 from './UX4';
import './App.css'
import PageSelect from './PageSelect';
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