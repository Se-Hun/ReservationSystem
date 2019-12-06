import React from 'react';

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Login = React.lazy(() => import('./views/Pages/Login'));
const Register = React.lazy(() => import('./views/Pages/Register'));
const Bookmark = React.lazy(() => import('./views/Pages/Bookmark'));
const ChangeUserInfo = React.lazy(() => import('./views/Pages/ChangeUserInfo'));
const Reserve = React.lazy(() => import('./views/Pages/Reserve'));
const ConfirmCancelReservation = React.lazy(() => import('./views/Pages/ConfirmCancelReservation'));
const EditReservation = React.lazy(() => import('./views/Pages/EditReservation'));
/*const Announcement = React.lazy(() => import('./views/Pages/Notice'));*/
const SearchRoutenSeat = React.lazy(() => import('./views/Pages/SearchRoutenSeat'));
const SearchSeat = React.lazy(() => import('./views/Pages/SearchSeat'));
const ConfirmReservation = React.lazy(() => import('./views/Pages/ConfirmReservation'));
const CheckEditReserve = React.lazy(() => import('./views/Pages/CheckEditReserve'));
const ConfirmLogin = React.lazy(() => import('./views/Pages/ConfirmLogin'));
const Announcements = React.lazy(() => import('./views/Pages/Notice'));
const AnnouncementsContent = React.lazy(() => import('./views/Pages/NoticeContent'));
const QnA = React.lazy(() => import('./views/Pages/QnA'));
const QnAContent = React.lazy(() => import('./views/Pages/QnAContent'));
// const Breadcrumbs = React.lazy(() => import('./views/Base/Breadcrumbs'));
// const Cards = React.lazy(() => import('./views/Base/Cards'));
// const Carousels = React.lazy(() => import('./views/Base/Carousels'));
// const Collapses = React.lazy(() => import('./views/Base/Collapses'));
// const Dropdowns = React.lazy(() => import('./views/Base/Dropdowns'));
// const Forms = React.lazy(() => import('./views/Base/Forms'));
// const Jumbotrons = React.lazy(() => import('./views/Base/Jumbotrons'));
// const ListGroups = React.lazy(() => import('./views/Base/ListGroups'));
// const Navbars = React.lazy(() => import('./views/Base/Navbars'));
// const Navs = React.lazy(() => import('./views/Base/Navs'));
// const Paginations = React.lazy(() => import('./views/Base/Paginations'));
// const Popovers = React.lazy(() => import('./views/Base/Popovers'));
// const ProgressBar = React.lazy(() => import('./views/Base/ProgressBar'));
// const Switches = React.lazy(() => import('./views/Base/Switches'));
// const Tables = React.lazy(() => import('./views/Base/Tables'));
// const Tabs = React.lazy(() => import('./views/Base/Tabs'));
// const Tooltips = React.lazy(() => import('./views/Base/Tooltips'));
// const BrandButtons = React.lazy(() => import('./views/Buttons/BrandButtons'));
// const ButtonDropdowns = React.lazy(() => import('./views/Buttons/ButtonDropdowns'));
// const ButtonGroups = React.lazy(() => import('./views/Buttons/ButtonGroups'));
// const Buttons = React.lazy(() => import('./views/Buttons/Buttons'));
// const Charts = React.lazy(() => import('./views/Charts'));
// const CoreUIIcons = React.lazy(() => import('./views/Icons/CoreUIIcons'));
// const Flags = React.lazy(() => import('./views/Icons/Flags'));
// const FontAwesome = React.lazy(() => import('./views/Icons/FontAwesome'));
// const SimpleLineIcons = React.lazy(() => import('./views/Icons/SimpleLineIcons'));
// const Alerts = React.lazy(() => import('./views/Notifications/Alerts'));
// const Badges = React.lazy(() => import('./views/Notifications/Badges'));
// const Modals = React.lazy(() => import('./views/Notifications/Modals'));
// const Colors = React.lazy(() => import('./views/Theme/Colors'));
// const Typography = React.lazy(() => import('./views/Theme/Typography'));
// const Widgets = React.lazy(() => import('./views/Widgets/Widgets'));
// const Announcements = React.lazy(() => import('./views/Announcements/Announcements'));
// const AnnContents = React.lazy(() => import('./views/Pages/NoticeContent'));
// const QnAContents = React.lazy(() => import('./views/pages/QnAContents'));
// const Users = React.lazy(() => import('./views/Users/Users'));
// const User = React.lazy(() => import('./views/Users/User'));
// const Register = React.lazy(() => import('./views/Pages/Register/Register'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'register', component: Register },
  { path: '/bookmark', name: 'bookmark', component: Bookmark },
  { path: '/changeuserinfo', name: 'change user information', component: ChangeUserInfo },
  { path: '/reserve', name: 'reserve', component: Reserve },
  { path: '/confirmCancelReservation', name: 'confirm cancel reserve', component: ConfirmCancelReservation },
  { path: '/confirmReservation', name: 'confirm reserve', component: ConfirmReservation },
  { path: '/checkEditReserve', name: 'check edit reserve', component: CheckEditReserve },
  { path: '/editReservation', name: 'edit reserve', component: EditReservation },
  { path: '/searchRoutenSeat', name: 'search route and seat', component: SearchRoutenSeat },
  { path: '/searchSeat', name: 'search seat', component: SearchSeat },
  { path: '/confirmLogin', name: 'confirm login', component: ConfirmLogin },
  // { path: '/theme', exact: true, name: 'Theme', component: Colors },
  // { path: '/theme/colors', name: 'Colors', component: Colors },
  // { path: '/theme/typography', name: 'Typography', component: Typography },
  // { path: '/base', exact: true, name: 'Base', component: Cards },
  // { path: '/base/cards', name: 'Cards', component: Cards },
  // { path: '/base/forms', name: 'Forms', component: Forms },
  // { path: '/base/switches', name: 'Switches', component: Switches },
  // { path: '/base/tables', name: 'Tables', component: Tables },
  // { path: '/base/tabs', name: 'Tabs', component: Tabs },
  // { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  // { path: '/base/carousels', name: 'Carousel', component: Carousels },
  // { path: '/base/collapses', name: 'Collapse', component: Collapses },
  // { path: '/base/dropdowns', name: 'Dropdowns', component: Dropdowns },
  // { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  // { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  // { path: '/base/navbars', name: 'Navbars', component: Navbars },
  // { path: '/base/navs', name: 'Navs', component: Navs },
  // { path: '/base/paginations', name: 'Paginations', component: Paginations },
  // { path: '/base/popovers', name: 'Popovers', component: Popovers },
  // { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  // { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  // { path: '/buttons', exact: true, name: 'Buttons', component: Buttons },
  // { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  // { path: '/buttons/button-dropdowns', name: 'Button Dropdowns', component: ButtonDropdowns },
  // { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  // { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  // { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  // { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  // { path: '/icons/flags', name: 'Flags', component: Flags },
  // { path: '/icons/font-awesome', name: 'Font Awesome', component: FontAwesome },
  // { path: '/icons/simple-line-icons', name: 'Simple Line Icons', component: SimpleLineIcons },
  // { path: '/notifications', exact: true, name: 'Notifications', component: Alerts },
  // { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  // { path: '/notifications/badges', name: 'Badges', component: Badges },
  // { path: '/notifications/modals', name: 'Modals', component: Modals },
  // { path: '/widgets', name: 'Widgets', component: Widgets },
  // { path: '/charts', name: 'Charts', component: Charts },
  // { path: '/users', exact: true,  name: 'Users', component: Users },
  // { path: '/users/:id', exact: true, name: 'User Details', component: User },
  { path: '/QnA', exact: true,  name: 'QnA', component: QnA },
  { path: '/QnA/:id', exact: true,  name: 'QnAContent', component: QnAContent },
  // { path: '/QnA/:id', exact: true, name: 'QnAContents', component: QnAContents },
  { path: '/notice', exact: true,  name: 'Announcements', component: Announcements },
  { path: '/notice/:id', exact: true,  name:'NoticeContent', component: AnnouncementsContent },
  // { path: '/Announcements/:id', exact: true, name: 'AnnContents', component: AnnContents },
  // { path: '/register', exact: true,  name: 'Register', component: Register },
];

export default routes;
