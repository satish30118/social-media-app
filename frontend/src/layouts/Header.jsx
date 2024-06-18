import React from "react";
import "../assets/css/header.css";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/logo1.jpg";
import { useAuth } from "../ContextApi/authContext";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { toast } from "react-toastify";
import userProfile from "../assets/img/bg.jpg";

export default function Header() {
  const [auth, setAuth] = useAuth();
  const imgPath = `${process.env.REACT_APP_API}/${auth?.user?.picturePath}`;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("TANGLE_USER_DET_SAT");
    setAuth({
      user: null,
      token: "",
    });
    setTimeout(() => {
      toast.success("Successfully Logout!!");
    }, 500);

    navigate("/account-login");
  };

  return (
    <>
      <header>
        <div className="header-left">
          <Link>
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className="header-right">
          {auth?.token ? (
            <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <React.Fragment>
                  <Button
                    variant="contained"
                    {...bindTrigger(popupState)}
                    style={{ padding: " 2px 17px" }}
                  >
                    <img
                      src={auth?.user?.picturePath ? imgPath : userProfile}
                      style={{
                        width: "45px",
                        height: "45px",
                        borderRadius: "50%",
                        border: "2px solid white",
                      }}
                      title="User Dashboard"
                      alt="profile"
                    />
                  </Button>
                  <Menu {...bindMenu(popupState)}>
                    <MenuItem onClick={popupState.close}>
                      <li>
                        <NavLink
                          to={`/dashboard}`}
                          style={{ textDecoration: "none" }}
                        >
                          Dashboard{" "}
                          <i
                            className="fas fa-dashboard"
                            style={{ marginLeft: "4px" }}
                          />
                        </NavLink>
                      </li>
                    </MenuItem>
                    <MenuItem onClick={popupState.close}>
                      <NavLink
                        onClick={handleLogout}
                        style={{ textDecoration: "none" }}
                      >
                        Logout
                        <i
                          className="fas fa-right-from-bracket"
                          style={{ marginLeft: "6px" }}
                        />
                      </NavLink>
                    </MenuItem>
                  </Menu>
                </React.Fragment>
              )}
            </PopupState>
          ) : (
            <NavLink to={"/account-login"}>Login</NavLink>
          )}
        </div>
      </header>
    </>
  );
}
