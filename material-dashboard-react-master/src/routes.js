/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import ProductsIcon from "@material-ui/icons/Apps";
import ContactsIcon from '@material-ui/icons/Contacts';

// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import Products from "views/Products/Products.js";
const dashboardRoutes = [
   {
    path: "/user",
    name: "Employee profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/products",
    name: "Products",
    rtlName: "قائمة الجدول",
    icon: ProductsIcon,
    component: Products,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "Clients List",
    rtlName: "قائمة الجدول",
    icon: ContactsIcon,
    component: TableList,
    layout: "/admin"
  },
  
];

export default dashboardRoutes;
