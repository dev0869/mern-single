
import React from "react";
import Box from "@mui/material/Box";

import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import AccountTreeIcon from "@mui/icons-material/AccountTree";

import { UserSidebar } from "../pages/UserDetails";
import { useLocation } from "react-router-dom";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

export default function LftDrawer() {
    const location = useLocation().pathname.includes("users");

    // Initialize the open state with a default value (false)
    const [state, setState] = React.useState({
        top: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{
                width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
                padding: "12px",
                marginTop: "20px",
            }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <UserSidebar />
        </Box>
    );

    return (
        <div>
            {["left"].map((anchor) => (
                <React.Fragment key={anchor}>
                    <button onClick={toggleDrawer(anchor, true)}>
                        {location ? (
                            <AccountTreeIcon color="secondary" />
                        ) : (
                            <div className="flex items-center">
                                <FilterAltIcon /> Filter
                            </div>
                        )}
                    </button>
                    <SwipeableDrawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                        onOpen={toggleDrawer(anchor, true)}
                    >
                        {list(anchor)}
                    </SwipeableDrawer>
                </React.Fragment>
            ))}
        </div>
    );
}
