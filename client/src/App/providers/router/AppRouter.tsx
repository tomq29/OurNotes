import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from '../../../Pages/HomePage/HomePage';

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
import { useAppSelector } from '../store/store';
import ProtectedRouter from '../../../Shared/hocs/ProtectedRouter';
import Spinner from '../../../Shared/LoadingSpinner/Spinner';

function AppRouter(): JSX.Element {
  const location = useLocation();

  const currentUser = useAppSelector((state) => state.currentUserStore.user);
  const loading = useAppSelector((state) => state.currentUserStore.loading);

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

  if (loading) {
    return <Spinner />; // Show loading spinner while loading
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route
        path="/notes"
        element={
          <ProtectedRouter isAllowed={currentUser} redirect="/auth/login">
            <NotesPage />
          </ProtectedRouter>
        }
      />

      <Route
        path="/mynote/:id"
        element={
          <ProtectedRouter isAllowed={currentUser} redirect="/auth/login">
            <PersonalNoteEditorPage />
          </ProtectedRouter>
        }
      />

      <Route
        path="/ournote/:id"
        element={
          <ProtectedRouter isAllowed={currentUser} redirect="/auth/login">
            <PairNoteEditorPage />
          </ProtectedRouter>
        }
      />

      <Route
        path="/questions"
        element={
          <ProtectedRouter isAllowed={currentUser} redirect="/auth/login">
            <SoonPage />
          </ProtectedRouter>
        }
      />

      <Route
        path="/calendar"
        element={
          <ProtectedRouter isAllowed={currentUser} redirect="/auth/login">
            <CalendarPage />
          </ProtectedRouter>
        }
      />

      <Route
        path="/quotes"
        element={
          <ProtectedRouter isAllowed={currentUser} redirect="/auth/login">
            <SoonPage />
          </ProtectedRouter>
        }
      />

      <Route
        path="/objectwriting"
        element={
          <ProtectedRouter isAllowed={currentUser} redirect="/auth/login">
            <SoonPage />
          </ProtectedRouter>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRouter isAllowed={currentUser} redirect="/auth/login">
            <ProfilePage />
          </ProtectedRouter>
        }
      />

      <Route
        path="/notes"
        element={
          <ProtectedRouter isAllowed={currentUser} redirect="/auth/login">
            <NotesPage />
          </ProtectedRouter>
        }
      />

      <Route path="/auth/logout" element={<LogOutPage />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/reg" element={<RegistrationPage />} />
      <Route path="/privacy-policy" element={<PrivacyPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRouter;
