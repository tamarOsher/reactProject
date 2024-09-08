import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './Layout.css';

const Layout: React.FC = () => {
  const navigate = useNavigate();

  const goIn = () => {
    navigate('/signIn');
  };

  const register = () => {
    navigate('/signUp');
  };

  const goAbout = () => {
    navigate('/aboutUs');
  };

  const goServices = () => {
    navigate('/services');
  };

  const goFAQ = () => {
    navigate('/FAQ');
  };

  const goContact = () => {
    navigate('/contact');
  };

  return (
    <div className="container">
      <header className="header">
        <nav>
          <button type="button" onClick={goIn}>כניסה</button>
          <button type="button" onClick={register}>הרשמה</button>
          <button type="button" onClick={goAbout}>אודותינו</button>
          <button type="button" onClick={goServices}>השירותים שלנו</button>
          <button type="button" onClick={goFAQ}>שאלות נפוצות</button>
          <button type="button" onClick={goContact}>צור קשר</button>
        </nav>
      </header>
      <main className="layout-main">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
