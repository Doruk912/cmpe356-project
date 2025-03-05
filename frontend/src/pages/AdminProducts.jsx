import React, { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import CommonDialog from '../components/AdminDialog';
import { products as initialProducts } from '../mockData/Products';

const Products = () => {
    const [products, setProducts] = useState(initialProducts);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        image: '',
    });

    const handleAdd = () => {
        setSelectedProduct(null);
        setFormData({
            name: '',
            description: '',
            price: '',
            category: '',
            stock: '',
            image: '',
        });
        setOpenDialog(true);
    };

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setFormData(product);
        setOpenDialog(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            setProducts(products.filter(product => product.id !== id));
        }
    };

    const handleSubmit = () => {
        if (selectedProduct) {
            setProducts(products.map(product =>
                product.id === selectedProduct.id ? { ...selectedProduct, ...formData } : product
            ));
        } else {
            setProducts([...products, { ...formData, id: products.length + 1 }]);
        }
        setOpenDialog(false);
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h5">Products Management</Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAdd}
                >
                    Add Product
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Image</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Stock</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        style={{ width: 50, height: 50, objectFit: 'cover' }}
                                    />
                                </TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.category}</TableCell>
                                <TableCell>${product.price}</TableCell>
                                <TableCell>{product.stock}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEdit(product)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(product.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <CommonDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                title={selectedProduct ? 'Edit Product' : 'Add Product'}
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
                type="product"
            />
        </Box>
    );
};

export default Products;