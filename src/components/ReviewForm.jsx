import React, { useState } from "react";

import {
  FormControl,
  InputLabel,
  Input,
  TextField,
  Button,
  FormLabel
} from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  center: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  marginTopp: {
    marginTop: "2rem"
  },
  marginTop: {
    marginTop: "2rem",
    width: "300px"
  },
  w100: {
    width: "100%"
  },
  backgroundBlue: {
    background: "#3F51B5",
    color: "white",
    borderRadius: "5px",
    fontSize: "20px"
  }
}));

function ReviewForm() {
  const classes = useStyles();

  const [Name, SetName] = useState(0);
  const [Email, SetEmail] = useState(0);
  const [Review, SetReview] = useState(0);

  var someDate = new Date();
  someDate.setDate(someDate.getDate());
  var date = someDate.toISOString().substr(0, 10);

  const [DateTime] = useState(date);

  //Makes post request to nodejs server
  async function MakePostRequest() {
    const review = {
      Name: Name,
      Email: Email,
      Date: DateTime,
      Review: Review
    };

    const response = await fetch("http://localhost:3212/feedbacks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(review)
    });
    return alert("Successful");
  }

  return (
    <form className={classes.center} onSubmit={MakePostRequest}>
      <div className={classes.marginTop}>
        <FormLabel className={classes.backgroundBlue} component="label">
          {" "}
          Leave a Feedback
        </FormLabel>
        <FormControl className={classes.w100}>
          <InputLabel>Name</InputLabel>
          <Input
            id="NameInput"
            aria-describedby="my-helper-text"
            onChange={event => SetName(event.target.value)}
            required
          />
        </FormControl>
      </div>
      <div className={classes.marginTop}>
        <FormControl className={classes.w100}>
          <InputLabel htmlFor="my-input">Email address</InputLabel>
          <Input
            id="emailInput"
            type="email"
            aria-describedby="my-helper-text"
            onChange={event => SetEmail(event.target.value)}
            required
          />
        </FormControl>
      </div>
      <div className={classes.marginTop}>
        <FormControl className={classes.w100}>
          <TextField
            disabled
            id="date"
            label="Date"
            type="date"
            defaultValue={DateTime}
            InputLabelProps={{
              shrink: true
            }}
          />
        </FormControl>
      </div>

      <div className={classes.marginTop}>
        <FormControl className={classes.w100}>
          <TextField
            id="outlined-multiline-static"
            label="Reviews"
            multiline
            rows="6"
            variant="outlined"
            onChange={event => SetReview(event.target.value)}
            required
          />
        </FormControl>
      </div>
      <div>
        <Button
          className={classes.marginTopp}
          type="submit"
          variant="contained"
          color="primary"
          endIcon={<Icon>send</Icon>}
        >
          Send
        </Button>
      </div>
    </form>
  );
}

export default ReviewForm;
