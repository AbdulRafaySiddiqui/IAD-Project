import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProductDetails } from "../actions/productActions";
import FormContainer from "../components/FormContainer";

const ProductEditScreen = ({ match, history }) => {
    const productId = match.params.id;

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [countInStock, setCountInStock] = useState(0);

    const dispatch = useDispatch();

    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    useEffect(() => {
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
    }, [product, dispatch, productId]);

    const submitHandler = (e) => {
        e.preventDefault();

        // updateProduct({

        // })
    };

    return (
        <>
            <Link to='/admin/productlist' className='btn btn-light my-3 '>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit Product</h1>
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
                            <Form.Label> Product Image </Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter image URL'
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            ></Form.Control>
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