import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthLayout } from '../view/layouts/AuthLayout';
import { DashBoard } from '../view/pages/DashBoard';
import { Login } from '../view/pages/Login';
import { Register } from '../view/pages/Register';
import { AuthGuard } from './AuthGuard';

export function Router() {
  return (
    <BrowserRouter basename='/mycontacts-front-end'>
      <Routes>
        <Route element={<AuthGuard isPrivate={false} />}>
          <Route element={<AuthLayout />}>
            <Route
              path='/login'
              element={<Login />}
            />
            <Route
              path='/register'
              element={<Register />}
            />
          </Route>
        </Route>

        <Route element={<AuthGuard isPrivate />}>
          <Route
            path='/'
            element={<DashBoard />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
