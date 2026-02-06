import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RequiredAuth from './components/RequiredAuth';
import AuthProvider from './providers/AuthProvider';
import HomeFeed from './components/home/HomeFeed';
import LoginPage from './components/auth/LoginPage';
import SignupPage from './components/auth/SignupPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route element={<RequiredAuth />}>
            <Route path="/" element={<HomeFeed />} />
            <Route path="/posts/:id" element={<h1>Post Detail Page - Protected</h1>} />
            <Route path="/create-post" element={<h1>Create Post Page - Protected</h1>} />
            <Route path="/edit-post/:id" element={<h1>Edit Post Page - Protected</h1>} />
            <Route path="/profile">
              <Route path="me">
                <Route index element={<h1>My Profile Page - Protected</h1>} />
                <Route path="edit" element={<h1>Edit My Profile Page - Protected</h1>} />
                <Route path="followers" element={<h1>My Followers Page - Protected</h1>} />
                <Route path="following" element={<h1>My Following Page - Protected</h1>} />
              </Route>
              <Route path=":id" element={<h1>Other User Profile Page - Protected</h1>} />
              <Route path=":id/followers" element={<h1>Other User Followers Page - Protected</h1>} />
              <Route path=":id/following" element={<h1>Other User Following Page - Protected</h1>} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
