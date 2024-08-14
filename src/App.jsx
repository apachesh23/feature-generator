import { useState } from 'react'
import ExperienceList from './components/ExperienceList/index';
import UX4 from './components/UX4/index';
import ScreenshotSettings from './components/ScreenshotSettings/index';
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
      case 'ScreenshotSettings':
        return <ScreenshotSettings />;
      default:
        return null;
    }
  };

  return (
    <>
      <object type="image/svg+xml" data="/feature_generator.svg" style={{ position: 'absolute', top: '20px', left: '20px', height: '50px' }}></object>
      <PageSelect />
      {renderPage()}
    </>
  );
};

export default App;