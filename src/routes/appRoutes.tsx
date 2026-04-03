import { RouteType } from "./config";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ComingSoon from "../assets/ComingSoon";
import DashboardPage from "../pages/dashboard/DashboardPage";
import PeopleIcon from '@mui/icons-material/People';
import CircleNotificationsOutlinedIcon from '@mui/icons-material/CircleNotificationsOutlined';
import InventoryIcon from '@mui/icons-material/Inventory';
import CrisisAlertOutlinedIcon from '@mui/icons-material/CrisisAlertOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import Login from "../components/LoginComponent/LoginComponent";
import { Tooltip } from "@mui/material";
import UsersPage from "../pages/users/UsersPage";
import BusinessIcon from '@mui/icons-material/Business';
import Person4Icon from '@mui/icons-material/Person4';
import PaymentsIcon from '@mui/icons-material/Payments';
import ReportIcon from '@mui/icons-material/Report';
import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
} from "react-icons/md";
import SalesReport from "../components/SalesReport/SalesReport";
import CollectionReport from "../components/CollectionReport/CollectionReport";
import DisbursementReport from "../components/DisbursementReport/DisbursementReport";
import DebtRepaymentReport from "../components/DebtRepaymentReport/DebtRepaymentReport";
import ConstructionProgressReport from "../components/ConstructionProgressReport/ConstructionProgressReport";
import InterestPayment from "../components/InterestPayment/InterestPayment";
import ProjectProfitability from "../components/ProjectProfitability/ProjectProfitability";
import CollectionDetail from "../components/CollectionDetail/CollectionDetail";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AssessmentIcon from '@mui/icons-material/Assessment';
import Inventory from "../components/Inventory/Inventory";
import InventoryPage from "../pages/InventoryPage/InventoryPage";
import CollectionReportPage from "../pages/CollectionReport/CollectionReportPage";
import PropertiesPage from "../pages/Properties/PropertiesPage";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import ProjectPaymentReportPage from "../pages/ProjectPaymentReport/ProjectPaymentReportPage";
import ClientPage from "../pages/client/ClientPage";
import CRMPage from "../pages/crm/CRMPage";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ArticleIcon from '@mui/icons-material/Article';
import { GiArtificialIntelligence } from "react-icons/gi";
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import WorkProgressPage from "../pages/WorkProgress/WorkProgressPage";
// import Person4Icon from '@mui/icons-material/Person4';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ProviderPage from "../pages/Provider/ProviderPage";
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import ShopIcon from '@mui/icons-material/Shop';
import LegalPage from "../pages/LegalPage/LegalPage";

const appRoutes: RouteType[] = [
  {
    index: true,
    element: <DashboardPage />,
    state: "Dashboard",
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,

    state: "dashboard",
    sidebarProps: {
      displayText: "Dashboard",
      icon: <Tooltip title="Dashboard" placement="right"><DashboardOutlinedIcon sx={{width:'17px', height:'17px'}}/></Tooltip>
            
    },
  
  },
  {
    path:'/propiedades',
    element: <PropertiesPage/>,
    state: "Propiedades",
    sidebarProps: {
      displayText: "Propiedades",
      icon: <Tooltip title="Client" placement="right"><GiArtificialIntelligence style={{width:'17px', height:'17px'}}/></Tooltip>
            
    },
  },
    {
    path:'/legal',
    element: <LegalPage/>,
    state: "Legal",
    sidebarProps: {
      displayText: "Legal",
      icon: <Tooltip title="Legal" placement="right"><ArticleIcon sx={{width:'17px', height:'17px'}}/></Tooltip>
            
    },
  },
  {
    visible:true,
    path: "/comercial",
    // element: <UsersPage />,
    element:<ComingSoon />,
    state: "Comercial",
    sidebarProps: {
      displayText: "Comercial",
      icon: <Tooltip title="Comercial" placement="right"><InventoryIcon sx={{width:'17px', height:'17px'}}/></Tooltip>
    }
  },
  {
    path:"/crm",
    element:<ComingSoon />,
    // index:false,
    state: "crm",
    sidebarProps: {
      displayText: "CRM",
      icon: <Tooltip title="CRM" placement="right"><AdminPanelSettingsIcon sx={{width:'17px', height:'17px'}}/></Tooltip>
    },
    child:[
      {
        path: '/crm/client',
        element:<ComingSoon />,
        state: 'Clients',
        index: true,
        // visible:true,
        sidebarProps: {
          displayText: 'Clients',
          icon: <Tooltip title="Clients" placement="right"><Person4Icon sx={{width:'17px', height:'17px'}}/></Tooltip>
        }
      },
      {
        path: '/crm/lead',
        element:<ComingSoon/>,
        state: 'Leads',
        index: true,
        visible:true,
        sidebarProps: {
          displayText: 'Leads',
          icon: <Tooltip title="Leads" placement="right"><PeopleAltIcon sx={{width:'17px', height:'17px'}}/></Tooltip>
        }
      }
  ]
  },
  
  {
    visible:true,
    path: "/valores",
    // element: <UsersPage />,
    element:<ComingSoon />,
    state: "Valores",
    sidebarProps: {
      displayText: "Valores",
      icon: <Tooltip title="Valores" placement="right"><PaymentsIcon sx={{width:'17px', height:'17px'}}/></Tooltip>
    }
  },
  {
    visible:true,
    path: "/gastos",
    // element: <UsersPage />,
    element:<ComingSoon />,
    state: "Gastos",
    sidebarProps: {
      displayText: "Gastos",
      icon: <Tooltip title="Gastos" placement="right"><ProductionQuantityLimitsIcon sx={{width:'17px', height:'17px'}}/></Tooltip>
    }
  },
  {
    visible:true,
    path: "/documentacion",
    // element: <UsersPage />,
    element:<ComingSoon />,
    state: "Documentacion",
    sidebarProps: {
      displayText: "Documentacion",
      icon: <Tooltip title="Documentacion" placement="right"><ShopIcon sx={{width:'17px', height:'17px'}}/></Tooltip>
    }
  },
  {
    visible:true,
    path: "/automatizacion",
    // element: <UsersPage />,
    element:<ComingSoon />,
    state: "Automatizacion",
    sidebarProps: {
      displayText: "Automatizacion",
      icon: <Tooltip title="Automatizacion" placement="right"><PaymentsIcon sx={{width:'17px', height:'17px'}}/></Tooltip>
    }
  },
  {
    path: "*",
    element: <ComingSoon />,
    state: "Usuarios",
    // sidebarProps: {
    //   displayText: "Users",
    //   icon: <PermIdentityOutlinedIcon />
    // }
  },
  
  {
    visible:true,
    path: "/users",
    // element: <UsersPage />,
    element:<ComingSoon />,
    state: "Usuarios",
    sidebarProps: {
      displayText: "Usuarios",
      icon: <Tooltip title="Users" placement="right"><PermIdentityOutlinedIcon sx={{width:'17px', height:'17px'}}/></Tooltip>
    }
  },
  
  {
    path:"/ayuda",
    element:<ComingSoon />,
    state: "Ayuda",
    sidebarProps: {
      displayText: "Ayuda",
      icon: <Tooltip title="Ayuda" placement="right"><ArticleIcon sx={{width:'17px', height:'17px'}}/></Tooltip>
    }
  },
  // {
  //   path:'/sales',
  //   // element: <SalesReport/>,
  //   element:<ComingSoon />,

  //   state: "Sales Report",
  //   sidebarProps: {
  //     displayText: "Ventas",
  //     icon: <Tooltip title="Ventas" placement="right"><ReportIcon sx={{width:'17px', height:'17px'}}/></Tooltip>
            
  //   },
  // },
  // {
  //   path: "/disbursement",
  //   // element: <DisbursementReport />,
  //   element:<ComingSoon />,

  //   state: "Disbursement Report",
  //   sidebarProps: {
  //     displayText: "Desembolsos",
  //     icon: <Tooltip title="Desembolsos" placement="right"><CircleNotificationsOutlinedIcon sx={{width:'17px', height:'17px'}}/></Tooltip>
  //   }
  // },
  // {
  //   path: "/debt_repayment",
  //   // element: <DebtRepaymentReport />,
  //   element:<ComingSoon />,

  //   state: "Debt Repayment Report",
  //   sidebarProps: {
  //     displayText: "Repago de Deuda",
  //     icon: <Tooltip title="Repago de Deuda" placement="right"><CrisisAlertOutlinedIcon sx={{width:'17px', height:'17px'}}/></Tooltip>
  //   }
  // },
  // {
  //   path: "/construction_progress",
  //   // element: <ConstructionProgressReport />,
  //   element:<ComingSoon />,

  //   state: "Construction Progress Report",
  //   sidebarProps: {
  //     displayText: "Avance de Construcción",
  //     icon: <Tooltip title="Avance de Construcción" placement="right"><AssessmentIcon sx={{width:'17px', height:'17px'}}/></Tooltip>
  //   }
  // },
  // {
  //   path: "/interest_payment",
  //   // element: <InterestPayment />,
  //   element:<ComingSoon />,

  //   state: "Interest Payment",
  //   sidebarProps: {
  //     displayText: "Pago de Intereses",
  //     icon: <Tooltip title="Pago de Intereses" placement="right"><ReportIcon sx={{width:'17px', height:'17px'}}/></Tooltip>
  //   }
  // },
  // {
  //   path: "/project_profitability",
  //   // element: <ProjectProfitability />,
  //   element:<ComingSoon />,

  //   state: "Project Profitability",
  //   sidebarProps: {
  //     displayText: "Rentabilidad del Proyecto",
  //     icon: <Tooltip title="Rentabilidad del Proyecto" placement="right"><TrendingUpIcon sx={{width:'17px', height:'17px'}}/></Tooltip>
  //   }
  // },
  // {
  //   path: "/collections_detail",
  //   // element: <CollectionDetail />,
  //   element:<ComingSoon />,
  //   state: "Collections Detail",
  //   sidebarProps: {
  //     displayText: "Detalle de Cobros",
  //     icon: <Tooltip title="Detalle de Cobros" placement="right"><ReportIcon sx={{width:'17px', height:'17px'}}/></Tooltip>
  //   }
  // },
  
  
];



export default appRoutes;