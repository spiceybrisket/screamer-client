import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";

import Scream from "../components/scream/Scream";
import Profile from "../components/profile/Profile";
import ScreamSkeleton from "../util/ScreamSkeleton";

import { useDispatch, useSelector } from "react-redux";
import { getScreams } from "../redux/actions/dataActions";

const Home = () => {
  const { screams, loading } = useSelector(state => state.data);
  const dispatch = useDispatch();
  useEffect(() => {
    const load = async () => {
      dispatch(getScreams());
    };
    load();
  }, []);

  let recentScreamsMarkup = !loading ? (
    screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
  ) : (
    <ScreamSkeleton />
  );
  return (
    <Grid container spacing={2}>
      <Grid item sm={8} xs={12}>
        {recentScreamsMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  );
};

export default Home;
