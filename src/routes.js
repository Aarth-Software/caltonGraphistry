import React from "react";

import async from "./components/Async";

// All pages that rely on 3rd party components (other than MUI) are
// loaded asynchronously, to keep the initial JS bundle to a minimum size

// Layouts
import AuthLayout from "./layouts/Auth";
import DashboardLayout from "./layouts/Dashboard";
import DocLayout from "./layouts/Doc";
import PresentationLayout from "./layouts/Presentation";

// Guards
import AuthGuard from "./components/guards/AuthGuard";

// Auth components
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import ResetPassword from "./pages/auth/ResetPassword";
import Page404 from "./pages/auth/Page404";
import Page500 from "./pages/auth/Page500";

// Components
import Changelog from "./pages/docs/Changelog";

// Landing
import Landing from "./pages/presentation/Landing";

// Protected routes
import ProtectedPage from "./pages/protected/ProtectedPage";
import AuthLanding from "./layouts/AuthLanding";
import FallDashboard from "./pages/dashboards/MainDashboard/FallDashboard";
import ContactUs from "./pages/auth/ContactUs";
import SendInviteEmail from "./components/auth/SendInviteEmail";
// import Analysis from "./pages/dashboards/DataAnalysis/Analysis";
const Analysis = async(() =>
  import("./pages/dashboards/DataAnalysis/Analysis")
);
// Dashboard components

const routes = [
  {
    path: "auth",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: (
          <AuthLayout>
            <AuthLanding />
          </AuthLayout>
        ),
      },
      {
        path: "sign-in",
        element: (
          <AuthLayout>
            <SignIn />
          </AuthLayout>
        ),
      },
      {
        path: "sign-up",
        element: (
          <AuthLayout>
            <SignUp />
          </AuthLayout>
        ),
      },
      {
        path: "reset-password",
        element: (
          <AuthLayout>
            <ResetPassword />
          </AuthLayout>
        ),
      },
      {
        path: "invite-user",
        element: (
          <AuthLayout>
            <SendInviteEmail />
          </AuthLayout>
        ),
      },
      {
        path: "404",
        element: <Page404 />,
      },
      {
        path: "500",
        element: <Page500 />,
      },
    ],
  },
  {
    path: "contact-us",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: (
          <AuthLayout>
            <ContactUs />
          </AuthLayout>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <PresentationLayout />,
    children: [
      {
        path: "",
        element: <Landing />,
      },
    ],
  },
  {
    path: "query",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "",
        element: <FallDashboard />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "",
        element: <Analysis />,
      },
    ],
  },
  //     {
  //       path: "default",
  //       element: <Default />,
  //     },
  //     {
  //       path: "analytics",
  //       element: <Analytics />,
  //     },
  //     {
  //       path: "saas",
  //       element: <SaaS />,
  //     },
  //     {
  //       path: "analysis",
  //       element: <Analysis />,
  //     },
  //   ],
  // },

  {
    path: "changelog",
    element: <DocLayout />,
    children: [
      {
        path: "",
        element: <Changelog />,
      },
    ],
  },
  {
    path: "private",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "",
        element: <ProtectedPage />,
      },
    ],
  },
  // {
  //   path: "private1",
  //   element: (
  //     <AuthGuard>
  //       <DashboardLayout />
  //     </AuthGuard>
  //   ),
  //   children: [
  //     {
  //       path: "",
  //       element: <FallDashboard />,
  //     },
  //   ],
  // },
  {
    path: "*",
    element: <AuthLayout />,
    children: [
      {
        path: "*",
        element: <Page404 />,
      },
    ],
  },
];

export default routes;
