import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ImageArea from '../components/products/ImageArea';
import { PrimaryButton, SelectBox, TextInput } from '../components/UIkit';
import { saveProduct } from '../reducks/products/operations';
import { db } from '../firebase/index';
import { SetSizeArea } from '../components/products';

const ProductEdit = () => {
   const dispatch = useDispatch();

   let id = window.location.pathname.split('/product/edit')[1];

   if (id !== '') {
      id = id.split('/')[1];
   }

   const [name, setName] = useState('');
   const [description, setDescription] = useState('');
   const [category, setCategory] = useState('');
   const [gender, setGender] = useState('');
   const [price, setPrice] = useState('');
   const [images, setImages] = useState([]);
   const [sizes, setSizes] = useState([]);

   const categories = [
      { id: 'all', name: '全て' },
      { id: 'tops', name: 'トップス' },
      { id: 'shirts', name: 'シャツ' },
      { id: 'pants', name: 'パンツ' },
   ];
   const genders = [
      { id: 'all', name: '全て' },
      { id: 'male', name: 'メンズ' },
      { id: 'female', name: 'レディース' },
   ];

   const inputName = useCallback(
      event => {
         setName(event.target.value);
      },
      [setName]
   );
   const inputDescription = useCallback(
      event => {
         setDescription(event.target.value);
      },
      [setDescription]
   );
   const inputPrice = useCallback(
      event => {
         setPrice(event.target.value);
      },
      [setPrice]
   );

   // id = 'vnuZLMxRY9xRATXwRKKm';
   useEffect(() => {
      if (id !== '') {
         db.collection('products')
            .doc(id)
            .get()
            .then(snapshot => {
               const data = snapshot.data();
               setName(data.name);
               setDescription(data.description);
               setCategory(data.category);
               setGender(data.gender);
               setPrice(data.price);
               setImages(data.images);
               setSizes(data.sizes);
            });
      }
   }, [id]);

   return (
      <section>
         <h2 className="u-text__headline u-text-center">商品の登録・編集</h2>
         <div className="c-section-container">
            <ImageArea images={images} setImages={setImages} />
            <TextInput
               fullWidth={true}
               label={'商品名'}
               multiline={false}
               required={true}
               onChange={inputName}
               rows={1}
               value={name}
               type={'text'}
            />
            <TextInput
               fullWidth={true}
               label={'商品説明'}
               multiline={true}
               required={true}
               onChange={inputDescription}
               rows={5}
               value={description}
               type={'text'}
            />
            <SelectBox
               label={'カテゴリ'}
               required={true}
               multiline={true}
               select={setCategory}
               options={categories}
               value={category}
            ></SelectBox>
            <SelectBox
               label={'性別'}
               required={true}
               multiline={true}
               select={setGender}
               options={genders}
               value={gender}
            ></SelectBox>
            <TextInput
               fullWidth={true}
               label={'価格'}
               multiline={false}
               required={true}
               onChange={inputPrice}
               rows={1}
               value={price}
               type={'number'}
            />
            <div className="module-spacer--small" />
            <SetSizeArea sizes={sizes} setSizes={setSizes} />
            <div className="module-spacer--small" />
            <div className="center">
               <PrimaryButton
                  label={'商品情報を追加'}
                  onClick={() => {
                     dispatch(
                        saveProduct(
                           id,
                           name,
                           description,
                           category,
                           gender,
                           price,
                           images,
                           sizes
                        )
                     );
                  }}
               />
            </div>
         </div>
      </section>
   );
};

export default ProductEdit;
