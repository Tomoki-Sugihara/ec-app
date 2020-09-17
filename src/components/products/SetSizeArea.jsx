import {
   IconButton,
   Paper,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
} from '@material-ui/core';
import {
   CheckCircle as CheckCircleIcon,
   Edit as EditIcon,
   Delete as DeleteIcon,
} from '@material-ui/icons';
// import Edit from '@material-ui/icons/Edit';
// import DeleteIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/styles';
import React, { useCallback, useState, useEffect } from 'react';
import { TextInput } from '../UIkit';

const useStyles = makeStyles({
   iconCell: {
      height: 48,
      width: 48,
   },
   checkIcon: {
      float: 'right',
   },
});
const SetSizeArea = props => {
   const classes = useStyles();

   const [index, setIndex] = useState(0),
      [size, setSize] = useState(''),
      [quantity, setQuantity] = useState(0);

   const inputSize = useCallback(
      e => {
         setSize(e.target.value);
      },
      [setSize]
   );
   const inputQuantity = useCallback(
      e => {
         setQuantity(e.target.value);
      },
      [setQuantity]
   );

   const addSize = (index, size, quantity) => {
      if (size === '' || quantity === '') {
         // required input is
         return;
      } else {
         if (index === props.sizes.length) {
            props.setSizes(prevState => [...prevState, { size, quantity }]);
            setIndex(index++);
            setSize('');
            setQuantity(0);
         } else {
            const newSizes = props.sizes;
            newSizes[index] = { size, quantity };
            props.setSizes(newSizes);
            setIndex(newSizes.length);
            setSize('');
            setQuantity(0);
         }
      }
   };

   const editSize = (index, size, quantity) => {
      setIndex(index);
      setSize(size);
      setQuantity(quantity);
   };

   const deleteSize = deleteIndex => {
      const newSizes = props.sizes.filter((item, i) => i !== deleteIndex);
      props.setSizes(newSizes);
   };

   useEffect(() => {
      setIndex(props.sizes.length);
   }, [props.sizes.length]);

   return (
      <div aria-label="サイズ展開">
         <TableContainer component={Paper}>
            <Table>
               <TableHead>
                  <TableRow>
                     <TableCell>サイズ</TableCell>
                     <TableCell>数量</TableCell>
                     <TableCell className={classes.iconCell}></TableCell>
                     <TableCell className={classes.iconCell}></TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {props.sizes.length > 0 &&
                     props.sizes.map((item, i) => (
                        <TableRow key={item.size}>
                           <TableCell>{item.size}</TableCell>
                           <TableCell>{item.quantity}</TableCell>
                           <TableCell>
                              <IconButton
                                 className={classes.iconCell}
                                 onClick={() =>
                                    editSize(i, item.size, item.quantity)
                                 }
                              >
                                 <EditIcon />
                              </IconButton>
                           </TableCell>
                           <TableCell>
                              <IconButton
                                 className={classes.iconCell}
                                 onClick={() => deleteSize(i)}
                              >
                                 <DeleteIcon />
                              </IconButton>
                           </TableCell>
                        </TableRow>
                     ))}
               </TableBody>
            </Table>
            <div>
               <TextInput
                  fullWidth={false}
                  label={'サイズ'}
                  multiline={false}
                  required={true}
                  onChange={inputSize}
                  row={1}
                  value={size}
                  type={'text'}
               ></TextInput>
               <TextInput
                  fullWidth={false}
                  label={'数量'}
                  multiline={false}
                  required={true}
                  onChange={inputQuantity}
                  row={1}
                  value={quantity}
                  type={'number'}
               ></TextInput>
            </div>
            <IconButton
               className={classes.checkIcon}
               onClick={() => addSize(index, size, quantity)}
            >
               <CheckCircleIcon />
            </IconButton>
         </TableContainer>
      </div>
   );
};

export default SetSizeArea;
