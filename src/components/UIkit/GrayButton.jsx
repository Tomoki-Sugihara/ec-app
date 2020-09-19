import { makeStyles } from '@material-ui/core';
import React from 'react';
const useStyles = makeStyles(theme => ({
   button: {
      backgroundColor: theme.palette.gray["300"],
      color: '#000',
      fontSize: 16,
      height: 48,
      marginBottom: 16,
      width: 256,
   },
}));

const GrayButton = props => {
   const classes = useStyles();
   return (
      <button
         className={classes.button}
         variant="contained"
         onClick={() => props.onClick()}
      >
         {props.label}
      </button>
   );
};

export default GrayButton;
