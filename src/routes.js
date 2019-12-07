import React from 'react';

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Login = React.lazy(() => import('./views/Pages/Login'));
const Register = React.lazy(() => import('./views/Pages/Register'));
const Bookmark = React.lazy(() => import('./views/Pages/Bookmark'));
const ChangeUserInfo = React.lazy(() => import('./views/Pages/ChangeUserInfo'));
const Reserve = React.lazy(() => import('./views/Pages/Reserve'));
const ConfirmCancelReservation = React.lazy(() => import('./views/Pages/ConfirmCancelReservation'));
const EditReservation = React.lazy(() => import('./views/Pages/EditReservation'));
const SearchRoutenSeat = React.lazy(() => import('./views/Pages/SearchRoutenSeat'));
const SearchSeat = React.lazy(() => import('./views/Pages/SearchSeat'));
const ConfirmReservation = React.lazy(() => import('./views/Pages/ConfirmReservation'));
const CheckEditReserve = React.lazy(() => import('./views/Pages/CheckEditReserve'));
// const ConfirmLogin = React.lazy(() => import('./views/Pages/ConfirmLogin'));
const Notice = React.lazy(() => import('./views/Pages/Notice/Notice'));
const NoticeContent = React.lazy(() => import('./views/Pages/Notice/NoticeContent'));
const QnA = React.lazy(() => import('./views/Pages/QnA/QnA'));
const QnAContent = React.lazy(() => import('./views/Pages/QnA/QnAContent'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/home', name: 'Dashboard', component: Dashboard },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'register', component: Register },
  { path: '/bookmark', name: 'bookmark', component: Bookmark },
  { path: '/changeuserinfo', exact: true, name: 'change user information', component: ChangeUserInfo },
  { path: '/reserve', name: 'reserve', component: Reserve },
  { path: '/confirmCancelReservation', exact: true, name: 'confirm cancel reserve', component: ConfirmCancelReservation },
  { path: '/confirmReservation', exact: true, name: 'confirm reserve', component: ConfirmReservation },
  { path: '/checkEditReserve',  exact: true,  name: 'check edit reserve', component: CheckEditReserve },
  { path: '/editReservation', name: 'edit reserve', component: EditReservation },
  { path: '/searchRoutenSeat', exact: true, name: 'search route and seat', component: SearchRoutenSeat },
  { path: '/searchSeat', exact: true, name: 'search seat', component: SearchSeat },
  // { path: '/confirmLogin', exact: true, name: 'confirm login', component: ConfirmLogin },
  { path: '/QnA', exact: true,  name: 'QnA', component: QnA },
  { path: '/QnA/:id', exact: true,  name: 'QnAContent', component: QnAContent },
  // { path: '/QnA/:id', exact: true, name: 'QnAContents', component: QnAContents },
  { path: '/notice', exact: true,  name: 'Notice', component: Notice },
  { path: '/notice/:id', exact: true,  name:'NoticeContent', component: NoticeContent },
  // { path: '/register', exact: true,  name: 'Register', component: Register },
];

export default routes;
