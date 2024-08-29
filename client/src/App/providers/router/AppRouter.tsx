import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from '../../../Pages/HomePage/HomePage';

import QuotesPage from '../../../Pages/QuotesPage/QuotesPage';
import ObjectWritingPage from '../../../Pages/ObjectWritingPage/ObjectWritingPage';
import LogOutPage from '../../../Pages/LogRegLogout/LogOutPage';
import LoginPage from '../../../Pages/LogRegLogout/LoginPage';
import RegistrationPage from '../../../Pages/LogRegLogout/RegistrationPage';
import NotFoundPage from '../../../Pages/LogRegLogout/NotFoundPage';
import NotesPage from '../../../Pages/NotesPage/NotesPage';

import ProfilePage from '../../../Pages/Profile/ProfilePage';
import { useEffect } from 'react';
import PrivacyPage from '../../../Pages/PrivacyPage/PrivacyPage';
import CalendarPage from '../../../Pages/CalendarPage/CalendarPage';

import SoonPage from '../../../Pages/SoonPage/SoonPage';
import PersonalNoteEditorPage from '../../../Pages/OneNotePage/PersonalNoteEditorPage';
import PairNoteEditorPage from '../../../Pages/OneNotePage/PairNoteEditorPage';

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
      case '/calendar':
        document.title = 'Календарь';
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
      case '/privacy-policy':
        document.title = 'Условия использования';
        break;
      default:
        document.title = 'Our Notes';
    }
  }, [location]);
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/notes" element={<NotesPage />} />
      {/* <Route path="/note/:id" element={<OneNotePage />} /> */}
      {/* <Route path="/note/:id" element={<OneNotePageV2 />} /> */}
      <Route path="/mynote/:id" element={<PersonalNoteEditorPage />} />
      <Route path="/ournote/:id" element={<PairNoteEditorPage />} />

      <Route path="/questions" element={<SoonPage />} />
      <Route path="/calendar" element={<CalendarPage />} />

      <Route path="/quotes" element={<SoonPage />} />

      <Route path="/objectwriting" element={<SoonPage />} />
      <Route path="/profile" element={<ProfilePage />} />

      <Route path="/auth/logout" element={<LogOutPage />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/reg" element={<RegistrationPage />} />
      <Route path="/privacy-policy" element={<PrivacyPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRouter;
