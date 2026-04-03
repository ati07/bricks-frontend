import { ListItemButton, ListItemIcon } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import colorConfigs from "../../configs/colorConfigs";
import { RootState } from "../../redux/app/store";
import { RouteType } from "../../routes/config";
import { useTranslation } from "react-i18next";

type Props = {
  item: RouteType;
  onClick?:()=>void;
};

const SidebarItem = ({ item }: Props) => {
  const { t, i18n } = useTranslation();
  const { appState } = useSelector((state: RootState) => state.appState);

  return (
    item.sidebarProps && item.path ? (
      <ListItemButton
        component={Link}
        to={item.path}
        sx={{
          // "&: hover": {
          //   backgroundColor: colorConfigs.sidebar.hoverBg
          // },
          // backgroundColor: appState === item.state ? colorConfigs.sidebar.activeBg : "unset",
          color:appState === item.state ? colorConfigs.sidebar.activeText : colorConfigs.sidebar.inActiveText,
          fontWeight: appState === item.state ? colorConfigs.sidebar.activeFontWeight : colorConfigs.sidebar.inActiveFontWeight,
          paddingY: "12px",
          paddingX: "24px"
        }}
      >
        <ListItemIcon sx={{
          color: appState === item.state ? colorConfigs.sidebar.activeIcon: colorConfigs.sidebar.inActiveIcon
        }}>
          {item.sidebarProps.icon && item.sidebarProps.icon}
        </ListItemIcon>
        {t(`${item.sidebarProps.displayText}`)}
      </ListItemButton>
    ) : null
  );
};

export default SidebarItem;