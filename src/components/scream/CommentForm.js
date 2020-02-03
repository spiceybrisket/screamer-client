import React, { useEffect, useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
// MUI Stuff
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
// Redux stuff
import { useSelector, useDispatch } from "react-redux";
import { submitComment } from "../../redux/actions/dataActions";

const styles = theme => ({
  ...theme.spreadIt
});

const CommentForm = ({ classes, screamId }) => {
  const dispatch = useDispatch();
  const { UI } = useSelector(state => state.UI);
  const { authenticated } = useSelector(state => state.user.authenticated);

  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {}, [errors]);
  useEffect(() => {}, [body]);
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.UI.errors) {
  //     this.setState({ errors: nextProps.UI.errors });
  //   }
  //   if (!nextProps.UI.errors && !nextProps.UI.loading) {
  //     this.setState({ body: '' });
  //   }
  // }

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(submitComment(screamId, { body: body }));
  };

  const commentFormMarkup = authenticated ? (
    <Grid item sm={12} style={{ textAlign: "center" }}>
      <form onSubmit={handleSubmit}>
        <TextField
          name="body"
          type="text"
          label="Comment on scream"
          error={errors.comment ? true : false}
          helperText={errors.comment}
          value={body}
          onChange={e => e.setBody(e.target.value)}
          fullWidth
          className={classes.textField}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Submit
        </Button>
      </form>
      <hr className={classes.visibleSeparator} />
    </Grid>
  ) : null;
  return commentFormMarkup;
};

export default withStyles(styles)(CommentForm);
