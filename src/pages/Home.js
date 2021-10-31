import React from "react";
import { Box, Container } from '@material-ui/core';

import CoursesList from '../components/CoursesList'
import HeaderMenu from '../components/HeaderMenu'

function Home( { isLoggedIn, user, handleLogout } ) {
    return (
        <Box>
            <HeaderMenu isLoggedIn={isLoggedIn} user={user} handleLogout={handleLogout} />
            <Container >
                <CoursesList />
            </Container>
        </Box>
    );
}

export default Home;