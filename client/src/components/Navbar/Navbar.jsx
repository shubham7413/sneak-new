import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./Navbar.scss";
import Cart from "../Cart/Cart";
import { useSelector } from "react-redux";
import {
  Badge,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Icon,
  IconButton,
  Typography,
} from "@mui/material";
import { CurrencyBitcoin, Logout } from "@mui/icons-material";
import useAuth from "../../hooks/useAuth";
import useToken from "../../hooks/useToken";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";

const Navbar = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const [open, setOpen] = useState(false);
  const products = useSelector((state) => state.cart.products);
  const { token, setToken } = useToken();
  const [dialog, setDialog] = useState(false);
  const { logOut } = useAuth();
  const navigate = useNavigate();

  const handleClose = () => {
    setDialog(false);
  };

  const handleLogout = async () => {
    await logOut();
    navigate("/login");
  };

  const handleToken = () => {
    navigate("/transaction");
  };

  return (
    <div className="navbar">
      <div className="wrapper">
        <img src="/img/walmart_logo.webp" alt="" className="logo" />
        <div className="left">
          <Link className="link" to="/">
            Sneak Kar
          </Link>
        </div>

        <div className="center">
          <TextField
            id="input-with-icon-textfield"
            className="search-field"
            label="Search everything at Sneak Kar online and in store"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            variant="standard"
          />
        </div>

        {/* token area */}
        <div className="right">
          <div className="token">
            <Badge badgeContent={token || 0} showZero color="primary">
              {/* <IconButton> */}
              <CurrencyBitcoin onClick={handleToken} />
              {/* </IconButton> */}
            </Badge>
          </div>

          {/* <div className="item">
            <Link className="link" to="/">
              Home
            </Link>
          </div> */}
          <div className="item">
            <Link className="link" to="/transfer">
              Transfer
            </Link>
          </div>
          <div className="item">
            <Link className="link" to="/about">
              About
            </Link>
          </div>

          <div className="icons">
            {/* <SearchIcon /> */}
            <PersonOutlineOutlinedIcon />
            <FavoriteBorderOutlinedIcon />

            <div className="cartIcon" onClick={() => setOpen(!open)}>
              <ShoppingCartOutlinedIcon />
              <span>{products.length}</span>
            </div>

            <Link className="link" to="/share">
              <ShareOutlinedIcon />
            </Link>
            <Logout onClick={handleLogout} />
          </div>
        </div>
      </div>

      {open && <Cart setOpen={setOpen} />}

      {/* token dialog box */}
      {/* <Dialog open={dialog} onClose={handleClose} fullWidth>
        <DialogTitle variant="h3">Available Tokens</DialogTitle>
        <DialogContent>
          <Typography variant="h6">
            Total tokens : {token || "Not present !"}
          </Typography>
          <Typography variant="h6">
            Days before expiry: 28 
          </Typography>
          <Typography variant="body1" color="primary.main" mt={3}>
            *Expiry date is calculated according to the last purchased
          </Typography>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog> */}
    </div>
  );
};

export default Navbar;
