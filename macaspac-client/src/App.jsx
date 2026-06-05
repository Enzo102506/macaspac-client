import { createHashRouter, RouterProvider, Navigate } from 'react-router-dom';

// HomePage Structure
import Layout from './layouts/Layout';
import ArticlePage from './pages/LandingPages/ArticlePage';
import ArticleDetailPage from './pages/LandingPages/ArticleDetailPage';
import ArticleListPage from './pages/LandingPages/ArticleListPage';
import HomePage from './pages/LandingPages/HomePage';
import AboutPage from './pages/LandingPages/AboutPage';
import AccessDeniedPage from './pages/LandingPages/AccessDeniedPage';
import DashboardPage from './pages/DashboardPages/DashboardPage';
import ReportsPage from './pages/DashboardPages/ReportsPage';
import UsersPage from './pages/DashboardPages/UsersPage';
import DashArticleListPage from './pages/DashboardPages/DashArticleListPage';
import SignInPage from './pages/AuthPages/SignInPage';
import SignUpPage from './pages/AuthPages/SignUpPage';
import NotFoundPage from './pages/LandingPages/NotFoundPage';
import { getToken, getUserType } from './utils/auth';

const RequireAuth = ({ children, allowedRoles = ['admin', 'editor'] }) => {
  const token = getToken();
  const userType = getUserType();

  if (!token || !userType) {
    return <Navigate to="/auth/signin" replace />;
  }

  if (!allowedRoles.includes(userType)) {
    return <Navigate to="/access-denied" replace />;
  }

  return children;
};

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'articles',
        element: <ArticlePage />,
      },
      {
        path: 'articles/:slug',
        element: <ArticleDetailPage />,
      },
      {
        path: 'article-list',
        element: <ArticleListPage />,
      },
      {
        path: 'dashboard',
        element: (
          <RequireAuth allowedRoles={['admin']}>
            <DashboardPage />
          </RequireAuth>
        ),
      },
      {
        path: 'reports',
        element: (
          <RequireAuth allowedRoles={['admin']}>
            <ReportsPage />
          </RequireAuth>
        ),
      },
      {
        path: 'users',
        element: (
          <RequireAuth allowedRoles={['admin']}>
            <UsersPage />
          </RequireAuth>
        ),
      },
      {
        path: 'dashboard/articles',
        element: (
          <RequireAuth allowedRoles={['admin', 'editor']}>
            <DashArticleListPage />
          </RequireAuth>
        ),
      },
      {
        path: 'access-denied',
        element: <AccessDeniedPage />,
      },
    ],
  },
  {
    path: 'auth/signin',
    element: <SignInPage />,
  },
  {
    path: 'auth/signup',
    element: <SignUpPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

const router = createHashRouter(routes);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;