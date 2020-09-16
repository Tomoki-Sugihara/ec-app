import {
   FormControl,
   InputLabel,
   makeStyles,
   MenuItem,
   Select,
} from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
   formControl: {
      marginBottom: 16,
      minWidth: 128,
      width: '100%',
   },
});

const SelectBox = props => {
   const classes = useStyles();
   return (
      <FormControl className={classes.formControl}>
         <InputLabel>{props.label}</InputLabel>
         <Select
            required={props.required}
            value={props.value}
            onChange={event => props.select(event.target.value)}
         >
            {props.options.map(option => {
               return (
                  <MenuItem key={option.id} value={option.id}>
                     {option.name}
                  </MenuItem>
               );
            })}
         </Select>
      </FormControl>
   );
};

export default SelectBox;
