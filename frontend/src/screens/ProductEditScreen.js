import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProductDetails, updateProduct } from "../actions/productActions";
import FormContainer from "../components/FormContainer";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

const ProductEditScreen = ({ match, history }) => {
    const productId = match.params.id;

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [countInStock, setCountInStock] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [uploadingError, setUploadingError] = useState(null);

    const dispatch = useDispatch();

    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    const productUpdate = useSelector((state) => state.productUpdate);
    const {
        loading: loadingUpate,
        error: errorUpdate,
        success: successUpdate,
    } = productUpdate;

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET });
            history.push("/admin/productlist");
        } else {
            if (!product.name || product._id !== productId) {
                dispatch(listProductDetails(productId));
            } else {
                setName(product.name);
                setPrice(product.price);
                setImage(product.image);
                setDescription(product.description);
                setBrand(product.brand);
                setCategory(product.category);
                setCountInStock(product.countInStock);
            }
        }
    }, [product, dispatch, productId, successUpdate, history]);

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);
        setUploading(true);

        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            };

            const { data } = await axios.post("/api/upload", formData, config);
            setImage(data);
            setUploading(false);
        } catch (error) {
            setUploading(false);
            setUploadingError(error.message);
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(
            updateProduct({
                _id: productId,
                name,
                price,
                image,
                brand,
                description,
                category,
                countInStock,
            })
        );
    };

    return (
        <>
            <Link to='/admin/productlist' className='btn btn-light my-3 '>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit Product</h1>
                {loadingUpate && <Loader />}
                {errorUpdate && (
                    <Message variant='danger'> {errorUpdate} </Message>
                )}

                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger'> {error} </Message>
                ) : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label> Product Name </Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='price'>
                            <Form.Label> Product Price </Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter price'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='image'>
                            <Form.Label> Product Image URL </Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter image URL'
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            ></Form.Control>
                            <Form.File
                                style={{ marginTop: "8px" }}
                                id='image-file'
                                label='Upload File Instead'
                                custom
                                onChange={uploadFileHandler}
                            ></Form.File>
                            {uploading && <Loader />}
                            {uploadingError !== null && (
                                <Message variant='danger'>
                                    {" "}
                                    {uploadingError}{" "}
                                </Message>
                            )}
                        </Form.Group>

                        <Form.Group controlId='description'>
                            <Form.Label> Product Description </Form.Label>
                            <Form.Control
                                as='textarea'
                                rows={4}
                                placeholder='Enter Description '
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='brand'>
                            <Form.Label> Product Brand </Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter brand Name'
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='category'>
                            <Form.Label> Product category </Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter category name'
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='countInStock'>
                            <Form.Label> Count in Stock </Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter Count in Stock'
                                value={countInStock}
                                onChange={(e) =>
                                    setCountInStock(e.target.value)
                                }
                            ></Form.Control>
                        </Form.Group>

                        <Button
                            style={{ borderRadius: "5px" }}
                            type='submit'
                            variant='primary'
                        >
                            Update Product
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </>
    );
};

export default ProductEditScreen;
