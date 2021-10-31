import React from "react";
import {
    Grid,
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    Avatar,
    IconButton,
    Typography
} from '@material-ui/core';
import { 
    MoreVert as MoreVertIcon,
    Favorite as FavoriteIcon,
    Share as ShareIcon
} from '@mui/icons-material';

function CourseCard({courseName, courseID, courseDesc}) {
    // Random background color generator
    const bgcolor = {backgroundColor: '#' + Math.floor(Math.random()*16777215).toString(16)};

    return (
        <Grid item xs={4} key={courseID}>
            <Card className='course-card'>
                <CardHeader 
                    avatar={
                        <Avatar style={bgcolor}>
                            {courseID.slice(0,2)}
                        </Avatar>
                    }

                    action={
                        <IconButton aria-label="settings">
                          <MoreVertIcon />
                        </IconButton>
                    }
                    title={courseName}
                    subheader={courseID}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image="https://www.viewsonic.com/library/wp-content/uploads/2021/01/LB0032-696x463.jpg"
                    alt="Paella dish"
                />

                <CardContent>
                    <Typography variant="body2" color="secondary">
                        {courseDesc}
                    </Typography>
                </CardContent>

                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    );
}

export default CourseCard;