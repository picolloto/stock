import ForestIcon from "@mui/icons-material/Forest";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { BottomNavigationAction, BottomNavigation } from "@mui/material";
import { PropTypes } from "prop-types";
import { useState } from "react";

const NavMenu = ({ onChangeMenu }) => {
    const [localValue, setLocalValue] = useState(1);

    return (
        <BottomNavigation
            showLabels
            value={localValue}
            onChange={(event, value) => {
                onChangeMenu(value);
                setLocalValue(value);
            }}
        >
            <BottomNavigationAction
                value={1}
                label="Matéria-prima/Produto"
                icon={<MenuBookIcon />}
            />
            <BottomNavigationAction value={2} label="Produto" icon={<Inventory2Icon />} />
            <BottomNavigationAction value={3} label="Matéria-prima" icon={<ForestIcon />} />
        </BottomNavigation>
    );
};

NavMenu.propTypes = {
    onChangeMenu: PropTypes.func.isRequired,
};

export default NavMenu;
