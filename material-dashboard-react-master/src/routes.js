
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
import UserDetails from "components/DisplayUser/UserDetails.js"  



export const viewRoutes = [
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
export const generalRoutes = [
  {
   path: "/admin/table/:name",  
   component: UserDetails
      
 },
//  {
//    path: "/login",  
//  component: Login ,
 
//  }
 
 
];
 