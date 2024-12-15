import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

// Import Context Here
import { useAuth } from "../contexts/AuthContext";

// Import Icons Here
// Admin Sidebar Icons
import DistrictsIcon from "../images/icons/sidebar/Districts.svg";
import StoresIcon from "../images/icons/sidebar/Stores.svg";
import StaffsIcon from "../images/icons/sidebar/Staffs.svg";
import RulesIcon from "../images/icons/sidebar/Rules.svg";
// Staff Sidebar Icons
import WarehousesIcon from "../images/icons/sidebar/Warehouses.svg";
// Both Admin & Staff Sidebar Icons
import LogoIcon from "../images/logo.png";
import LogoutIcon from "../images/icons/sidebar/Logout.svg";
import ProductsIcon from "../images/icons/sidebar/Products.svg";
import CustomersIcon from "../images/icons/sidebar/Customers.svg";
import ReportsIcon from "../images/icons/sidebar/Reports.svg";

function Sidebar() {
  // Variables here
  // Variables for controlling sidebar
  const { isLoggedIn, logout, userInfo } = useAuth();

  const { t } = useTranslation();
  const {
    Districts,
    Stores,
    ProductCategories,
    Staffs,
    Rules,
    Reports,
    Products,
    Warehouses,
    StoreManagement,
    Customers,
    LogOut_Btn,
  } = t("Sidebar");

  // Functions here
  // Function for logout
  const handleLogout = () => {
    logout();
  };

  // Sidebar Buttons
  const adminSidebarButtons = [
    {
      to: "/districts",
      icon: DistrictsIcon,
      title: Districts,
      animation: [0.2, 0.2, 0.25],
    },
    {
      to: "/stores",
      icon: StoresIcon,
      title: Stores,
      animation: [0.3, 0.3, 0.35],
    },
    {
      to: "/product-categorys",
      icon: ProductsIcon,
      title: ProductCategories,
      animation: [0.4, 0.4, 0.45],
    },
    {
      to: "/staff-management",
      icon: StaffsIcon,
      title: Staffs,
      animation: [0.5, 0.5, 0.55],
    },
    {
      to: "/rule-management",
      icon: RulesIcon,
      title: Rules,
      animation: [0.6, 0.6, 0.65],
    },
    {
      to: "/customer",
      icon: CustomersIcon,
      title: Customers,
      animation: [0.7, 0.7, 0.75],
    },
    {
      to: "/admin-report",
      icon: ReportsIcon,
      title: Reports,
      animation: [0.8, 0.8, 0.85],
    },
    {
      to: "/login",
      icon: LogoutIcon,
      title: LogOut_Btn,
      animation: [0.9, 0.9, 0.95],
    },
  ];

  const staffSidebarButtons = [
    {
      to: "/products",
      icon: ProductsIcon,
      title: Products,
      animation: [0.2, 0.2, 0.25],
    },
    {
      to: "/warehouse",
      icon: WarehousesIcon,
      title: Warehouses,
      animation: [0.3, 0.3, 0.35],
    },
    {
      to: "/customer",
      icon: CustomersIcon,
      title: Customers,
      animation: [0.4, 0.4, 0.45],
    },
    {
      to: "/store-management",
      icon: StoresIcon,
      title: StoreManagement,
      animation: [0.5, 0.5, 0.55],
    },
    // {
    //   to: "/staff-report",
    //   icon: ReportsIcon,
    //   title: Reports,
    //   animation: [0.6, 0.6, 0.65],
    // },
    {
      to: "/login",
      icon: LogoutIcon,
      title: LogOut_Btn,
      animation: [0.6, 0.6, 0.65],
    },
  ];

  // NavLink Global Classname Here
  const linkStyles = ({ isActive }) =>
    `my-4 flex items-center justify-center gap-3 py-4 text-left text-xl lg:justify-start ${
      isActive
        ? "bg-gradient-to-tr from-red-600 to-[#ee7272] font-bold text-white"
        : "group transform-gpu text-white transition-all duration-300 ease-in-out hover:text-red-500"
    }`;

  // Animation here
  const sidebarVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const itemVariants = {
    hidden: { x: "-100%", opacity: 0 },
    visible: (delay) => ({
      x: 0,
      opacity: 1,
      transition: { delay, duration: 0.5, ease: "easeOut" },
    }),
  };
  // Function for change button's state
  // Render return here
  return (
    <motion.div
      className="h-screen w-full bg-black"
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
    >
      {/* If in login page, show only 'BettaShop' */}
      <motion.a
        href={isLoggedIn ? (userInfo.isAdmin ? "/stores" : "/products") : "/"}
        className="flex flex-wrap items-center justify-center space-x-5 py-5 hover:cursor-pointer"
        variants={itemVariants}
        custom={0.1}
        whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
      >
        <motion.img
          src={LogoIcon}
          alt="Logo"
          className="h-[100px] w-[100px] rounded-full"
          variants={itemVariants}
          custom={0.15}
        />
        <motion.p
          className="bg-gradient-to-t from-red-700 via-[#f29f9f] to-white bg-clip-text text-2xl font-bold italic text-transparent transition-colors hover:bg-gradient-to-t hover:from-white hover:via-[#f29f9f] hover:to-red-500 lg:text-3xl"
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          custom={0.2}
        >
          BettaShop
        </motion.p>
      </motion.a>

      {/* isLoggedIn */}
      {isLoggedIn ? (
        userInfo.isAdmin === true ? (
          <>
            {/* isAdmin */}
            {adminSidebarButtons.map((button, index) => (
              <NavLink
                key={index}
                to={button.to}
                className={
                  button.to === "/login"
                    ? "group my-4 flex transform-gpu items-center justify-center gap-3 py-4 text-left text-xl text-white transition-all duration-300 ease-in-out hover:text-red-500 lg:justify-start"
                    : linkStyles
                }
                onClick={() =>
                  button.to === "/login" ? handleLogout() : <></>
                }
              >
                <motion.div
                  className="flex w-full items-center justify-center gap-3 lg:justify-start"
                  initial="hidden"
                  animate="visible"
                  variants={itemVariants}
                  custom={button.animation[0]}
                  whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                >
                  <motion.img
                    src={button.icon}
                    alt="Icon mặt hàng"
                    className="mx-5 h-10 w-10"
                    variants={itemVariants}
                    custom={button.animation[1]}
                  />
                  <motion.p
                    className="hidden w-fit bg-gradient-to-r from-red-700 via-[#ee7272] to-[#f6cdcd] bg-[length:0%_3px] bg-left-bottom bg-no-repeat font-bold transition-all duration-500 ease-out group-hover:bg-[length:100%_3px] lg:block"
                    variants={itemVariants}
                    custom={button.animation[2]}
                  >
                    {button.title}
                  </motion.p>
                </motion.div>
              </NavLink>
            ))}
          </>
        ) : (
          <>
            {/* isStaff */}
            {staffSidebarButtons.map((button, index) => (
              <NavLink
                key={index}
                to={button.to}
                className={
                  button.to === "/login"
                    ? "group my-4 flex transform-gpu items-center justify-center gap-3 py-4 text-left text-xl text-white transition-all duration-300 ease-in-out hover:text-red-500 lg:justify-start"
                    : linkStyles
                }
                onClick={() =>
                  button.to === "/login" ? handleLogout() : <></>
                }
              >
                <motion.div
                  className="flex w-full items-center justify-center gap-3 lg:justify-start"
                  initial="hidden"
                  animate="visible"
                  variants={itemVariants}
                  custom={button.animation[0]}
                  whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                >
                  <motion.img
                    src={button.icon}
                    alt="Icon mặt hàng"
                    className="mx-5 h-10 w-10"
                    variants={itemVariants}
                    custom={button.animation[1]}
                  />
                  <motion.p
                    className="hidden w-fit bg-gradient-to-r from-red-700 via-[#ee7272] to-[#f6cdcd] bg-[length:0%_3px] bg-left-bottom bg-no-repeat font-bold transition-all duration-500 ease-out group-hover:bg-[length:100%_3px] lg:block"
                    variants={itemVariants}
                    custom={button.animation[2]}
                  >
                    {button.title}
                  </motion.p>
                </motion.div>
              </NavLink>
            ))}
          </>
        )
      ) : (
        <></>
      )}
    </motion.div>
  );
}

export default Sidebar;
