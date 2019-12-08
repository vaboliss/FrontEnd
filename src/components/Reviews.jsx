import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
  Grid
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  flex: {
    display: "flex",
    flexDirection: "row"
  },
  w100: {
    width: "100%"
  },
  mtop: {
    marginTop: "2rem"
  },
  textCenter: {
    textAlign: "center",
    justifyContent: "center"
  }
}));

function Reviews() {
  const [Review, SetReview] = useState([]);

  const classes = useStyles();

  function get() {
    SetReview([]);
    fetch("http://localhost:3212/feedbacks", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(myJson => {
        for (let i = 0; i < myJson.body.length; i++) {
          SetReview(oldReviews => [
            ...oldReviews,
            {
              Name: myJson["body"][i].Name,
              Email: myJson["body"][i].Email,
              Date: myJson["body"][i].Date,
              Review: myJson["body"][i].Review
            }
          ]);
        }
      });
  }
  return (
    <div>
      <div className={classes.textCenter}>
        <h4 className={classes.mtop}>Look at all feedbacks</h4>
        <Button className={classes.textCenter} variant="outlined" onClick={get}>
          Get Feedbacks
        </Button>
      </div>

      <div className={(classes.flex, classes.mtop)}>
        <Grid container>
          {Review.map((data, index) => (
            <Grid key={index} item md={3}>
              <Card>
                <CardContent>
                  <Typography color="textPrimary" gutterBottom>
                    {`Name : ${data.Name}`}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    {`Email : ${data.Email}`}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    {`Date : ${data.Date}`}
                  </Typography>
                  <TextField
                    disabled
                    className={classes.w100}
                    id="outlined-multiline-static"
                    label="Review"
                    multiline
                    rows="6"
                    variant="outlined"
                    defaultValue={data.Review}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}
export default Reviews;
