import React, { useState, useEffect } from "react";
import CourseCard from './CourseCard';

import { Grid } from '@material-ui/core';

function CoursesList() {
    const [courses, setCourses] = useState([]);
    
    //const apiUrl = "https://btcn-3-webnc.herokuapp.com"
    const apiUrl = "http://localhost:3000";

    useEffect(() => {
        fetch(`${apiUrl}/courses`)
        .then(res => res.json())
        .then(
            (result) => {
                setCourses(result);
            }
        );
    }, []);

    return (
        <Grid container spacing={5}>
            {courses.map(course => CourseCard(course))}
        </Grid>
    );
}

export default CoursesList;