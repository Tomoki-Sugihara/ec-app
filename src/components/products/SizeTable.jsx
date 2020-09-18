import {
   IconButton,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableRow,
} from '@material-ui/core';
import { FavoriteBorder, ShoppingCart } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';

const useStyles = makeStyles({
   iconCell: {
      padding: 0,
      height: 48,
      width: 48,
   },
});

const SizeTable = props => {
   const classes = useStyles();
   return (
      <TableContainer>
         <Table>
            <TableBody>
               {props.sizes.length > 0 &&
                  props.sizes.map(item => (
                     <TableRow key={item.size}>
                        <TableCell component="th" scope="row">
                           {item.size}
                        </TableCell>
                        <TableCell>残り{item.quantity}点</TableCell>
                        <TableCell className={classes.iconCell}>
                           {item.quantity > 0 && (
                              <IconButton>
                                 <ShoppingCart />
                              </IconButton>
                           )}
                        </TableCell>
                        <TableCell className={classes.iconCell}>
                           <IconButton className={classes.iconCell}>
                              <FavoriteBorder />
                           </IconButton>
                        </TableCell>
                     </TableRow>
                  ))}
            </TableBody>
         </Table>
      </TableContainer>
   );
};

export default SizeTable;
