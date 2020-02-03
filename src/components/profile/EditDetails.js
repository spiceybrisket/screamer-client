import React, { useState, Fragment, useEffect } from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../util/MyButton";
// Redux stuff
import { useDispatch, useSelector } from "react-redux";
import { editUserDetails } from "../../redux/actions/userActions";
// MUI Stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
// Icons
import EditIcon from "@material-ui/icons/Edit";

const styles = theme => ({
  ...theme.spreadIt,
  button: {
    float: "right"
  }
});

const EditDetails = ({ classes }) => {
  const { credentials } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("");
  const [open, setOpen] = useState(false);

  const mapUserDetailsToState = credentials => {
    setBio(credentials.bio ? credentials.bio : "");
    setWebsite(credentials.website ? credentials.website : "");
    setLocation(credentials.location ? credentials.location : "");
  };

  const handleOpen = () => {
    setOpen(true);
    mapUserDetailsToState(credentials);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    mapUserDetailsToState(credentials);
  }, [credentials]);

  const handleSubmit = () => {
    const userDetails = {
      bio: bio,
      website: website,
      location: location
    };
    dispatch(editUserDetails(userDetails));
    handleClose();
  };

  return (
    <Fragment>
      <MyButton
        tip="Edit Details"
        onClick={handleOpen}
        btnClassName={classes.button}
      >
        <EditIcon color="primary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit your details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="bio"
              tpye="text"
              label="Bio"
              multiline
              rows="3"
              placeholder="A short bio about yourself"
              className={classes.textField}
              value={bio}
              onChange={e => setBio(e.target.value)}
              fullWidth
            />
            <TextField
              name="website"
              tpye="text"
              label="Website"
              placeholder="Your personal/professinal website"
              className={classes.textField}
              value={website}
              onChange={e => setWebsite(e.target.value)}
              fullWidth
            />
            <TextField
              name="location"
              tpye="text"
              label="Location"
              placeholder="Where you live"
              className={classes.textField}
              value={location}
              onChange={e => setLocation(e.target.value)}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default withStyles(styles)(EditDetails);
