import React from "react";
import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom";
import { 
    AppBar,
    Box,
    Divider,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Snackbar
} from '@material-ui/core';
import { 
    Menu as MenuIcon,
    Add as AddIcon,
    Logout as LogoutIcon,
    Face as FaceIcon,
    Settings as SettingsIcon,
    AccountCircle,
} from '@mui/icons-material';
import MuiAlert from '@mui/material/Alert';

function HeaderMenu({ isLoggedIn, user, handleLogout }) {
    const apiUrl = "https://btcn-3-webnc.herokuapp.com";
    //const apiUrl = "http://localhost:3000";

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openPopup, setOpenPopup] = React.useState(false);
    
    // State for add new course
    const { register, handleSubmit } = useForm();
    const [openSuccessAlert, setOpenSuccessAlert] = React.useState(false);
    const [openFailAlert, setOpenFailAlert] = React.useState(false);

    // Customize style

    const iconMenuStyle = {marginRight: '10px'};
    const menuItemStyle = {color: 'gray'};
    
    // Action handler

    const handleSubmitForm = (data) => {
        fetch(`${apiUrl}/courses`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                courseName: data.courseName,
                courseID: data.courseID,
                courseDesc: data.courseDesc
            })
        })
        .then(res => res.json())
        .then(
            (result) => {
                if(result) {
                    handleSuccessAlertOpen();
                    handlePopupClose();
                    window.location.reload();
                } else {
                    handleFailAlertOpen()
                }
            }
        );
    }

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleProfileMenuClose = () => {
        setAnchorEl(null);
    };

    const handleSuccessAlertOpen = () => {
        setOpenSuccessAlert(true);
    }

    const handleSuccessAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSuccessAlert(false);
    }

    const handleFailAlertOpen = () => {
        setOpenFailAlert(true);
    }

    const handleFailAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenFailAlert(false);
    }

    const handlePopupOpen = () => {
        setOpenPopup(true);
    }

    const handlePopupClose = () => {
        setOpenPopup(false)
    }

    const renderProfileMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            getContentAnchorEl={null}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
        >
          <MenuItem style={menuItemStyle}>
            <FaceIcon fontSize="small" style={iconMenuStyle} />
            { user ? `${user.firstname} ${user.lastname}` : '' }
          </MenuItem>
          <Divider />
          <MenuItem style={menuItemStyle}>
            <SettingsIcon fontSize="small" style={iconMenuStyle} />
              C??i ?????t
          </MenuItem>
          <MenuItem style={menuItemStyle} onClick={handleLogout} >
            <LogoutIcon fontSize="small" style={iconMenuStyle} />
            ????ng xu???t
          </MenuItem>
        </Menu>
    );
    
    const renderPopupDialog = (
        <Dialog open={openPopup} onClose={handlePopupClose}>
            <DialogTitle>Th??m l???p h???c</DialogTitle>
            <form onSubmit={handleSubmit(handleSubmitForm)}>
                <DialogContent>
                    <DialogContentText>
                        Vui l??ng nh???p th??ng tin v??? l???p h???c mu???n t???o.
                    </DialogContentText>
                    <TextField {...register('courseName')} autoFocus 
                        fullWidth
                        margin="dense"
                        label="T??n l???p h???c"
                        variant="outlined"
                        required
                    />
                    <TextField {...register('courseID')}
                        fullWidth
                        margin="dense"
                        label="M?? l???p"
                        variant="outlined"
                        required
                    />
                    <TextField {...register('courseDesc')}
                        fullWidth
                        multiline
                        rows = {7}
                        margin="dense"
                        label="Th??m th??ng tin v??? l???p h???c"
                        variant="outlined"
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handlePopupClose}>Hu???</Button>
                    <Button type='submit'>Th??m</Button>
                </DialogActions>
            </form>
        </Dialog>
    );

    const renderSuccesAlert = (
        <Snackbar open={openSuccessAlert} autoHideDuration={6000} onClose={handleSuccessAlertClose}>
            <MuiAlert onClose={handleSuccessAlertClose} severity="success" sx={{ width: '100%' }}>
                T???o l???p h???c m???i th??nh c??ng
            </MuiAlert>
        </Snackbar>
    );

    const renderFailAlert = (
        <Snackbar open={openFailAlert} autoHideDuration={6000} onClose={handleFailAlertClose}>
            <MuiAlert onClose={handleFailAlertClose} severity="error" sx={{ width: '100%' }}>
                T???o l???p h???c m???i th???t b???i (M?? l???p h???c ???? t???n t???i)
            </MuiAlert>
        </Snackbar>
    );

    return (
        <Box mb={4} sx={{ flexGrow: 1 }}>
        <AppBar position="static" className='menu'>
            <Toolbar>
                <IconButton
                    size="medium"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    DANH S??CH KHO?? H???C
                </Typography>
                { isLoggedIn ? (
                    <Box sx={{ marginLeft: 'auto' }}>
                        <IconButton
                            size="medium"
                            color="inherit"
                            aria-haspopup="true"
                            onClick={handlePopupOpen}>
                            <AddIcon />
                        </IconButton>

                        <IconButton
                            size="medium"
                            color="inherit"
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}>
                            <AccountCircle />
                        </IconButton>
                    </Box>
                ) : (
                    <Box sx={{ marginLeft: 'auto' }}>
                        <Button component={Link} to={'/register'} color="inherit">????ng k??</Button>
                        <Button component={Link} to={'/login'} color="inherit">????ng nh???p</Button>
                    </Box>
                )}
                
            </Toolbar>
        </AppBar>
        {renderProfileMenu}
        {renderPopupDialog}
        {renderSuccesAlert}
        {renderFailAlert}
      </Box>
    );
}

export default HeaderMenu;