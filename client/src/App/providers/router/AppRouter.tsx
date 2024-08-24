import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from '../../../Pages/HomePage/HomePage';
import QuestionsPage from '../../../Pages/QuestionsPage/QuestionsPage';
import QuotesPage from '../../../Pages/QuotesPage/QuotesPage';
import ObjectWritingPage from '../../../Pages/ObjectWritingPage/ObjectWritingPage';
import LogOutPage from '../../../Pages/LogRegLogout/LogOutPage';
import LoginPage from '../../../Pages/LogRegLogout/LoginPage';
import RegistrationPage from '../../../Pages/LogRegLogout/RegistrationPage';
import NotFoundPage from '../../../Pages/LogRegLogout/NotFoundPage';
import NotesPage from '../../../Pages/NotesPage/NotesPage';
import OneNotePage from '../../../Pages/OneNotePage/OneNotePage';
import ProfilePage from '../../../Pages/Profile/ProfilePage';
import { useEffect } from 'react';

function AppRouter(): JSX.Element {
  const location = useLocation();

  useEffect(() => {
    // Устанавливаем заголовок страницы в зависимости от текущего пути
    switch (location.pathname) {
      case '/':
        document.title = 'OurNotes';
        break;
      case '/notes':
        document.title = 'Заметки';
        break;
      case '/questions':
        document.title = 'Вопросы';
        break;
      case '/profile':
        document.title = 'Личный кабинет';
        break;
      case '/quotes':
        document.title = 'Цитаты';
        break;
      case '/objectwriting':
        document.title = 'Objectwriting';
        break;
      case '/auth/login':
        document.title = 'Вход';
        break;
      case '/auth/logout':
        document.title = 'Выход';
        break;
      case '/auth/reg':
        document.title = 'Регистрация';
        break;
      default:
        document.title = 'Our Notes';
    }
  }, [location]);
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/notes" element={<NotesPage />} />
      <Route path="/note/:id" element={<OneNotePage />} />

      <Route path="/questions" element={<QuestionsPage />} />

      <Route path="/quotes" element={<QuotesPage />} />

      <Route path="/objectwriting" element={<ObjectWritingPage />} />
      <Route path="/profile" element={<ProfilePage />} />

      <Route path="/auth/logout" element={<LogOutPage />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/reg" element={<RegistrationPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRouter;
