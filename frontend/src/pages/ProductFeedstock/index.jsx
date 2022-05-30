import {
    Box,
    Container,
    TextField,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";

import { useCallback, useEffect, useMemo, useState } from "react";

import Swal from "sweetalert2";
import { processProductFeedstock } from "./productFeedstockController";
import {
    deleteProductFeedstock,
    getProductFeedstocks,
    insertProductFeedstock,
} from "./productFeedstockService";

import Crud from "../../components/Crud";
import ModalCrud from "../../components/ModalCrud";
import { getFeedstocks } from "../Feedstock/feedstockService";
import { getProducts } from "../Product/productService";

const ProductFeedstock = () => {
    const [productFeedstock, setProductFeedstock] = useState([]);
    const [products, setProducts] = useState([]);
    const [feedstocks, setFeedstocks] = useState([]);
    const initialValue = {
        product_id: null,
        feedstock_id: null,
        min_quantity: 0,
    };
    const [selectedRow, setSelectedRow] = useState(initialValue);

    const [openModal, setOpenModal] = useState(false);

    const handleChange = useCallback(
        (e) => {
            const { name, value } = e.target;
            setSelectedRow((prevState) => ({ ...prevState, [name]: value }));
        },
        [products, feedstocks]
    );

    const onEdit = useCallback(async (item) => {
        setOpenModal(true);
        setSelectedRow(item);
    }, []);

    const didMount = useCallback(async () => {
        const [{ data: productFeedstockList }, { data: productList }, { data: feedstockList }] =
            await Promise.all([getProductFeedstocks(), getProducts(), getFeedstocks()]);
        const processedProductFeedstock = processProductFeedstock(productFeedstockList.content);
        setProductFeedstock(processedProductFeedstock);
        setProducts(productList.content);
        setFeedstocks(feedstockList.content);
    }, []);

    const handleSubmit = useCallback(async () => {
        try {
            await insertProductFeedstock(selectedRow);
            didMount();
            setOpenModal(false);
            setSelectedRow(initialValue);
            if (!selectedRow.id) {
                Swal.fire("Informação", "Produto cadastrado com sucesso.", "success");
            } else {
                Swal.fire("Informação", "Produto alterado com sucesso.", "success");
            }
        } catch {
            setOpenModal(false);
            setSelectedRow(initialValue);
            Swal.fire("Atenção", "Ocorreu um problema inesperado ao salvar o produto!", "warning");
        }
    }, [selectedRow]);

    const onDelete = useCallback((item) => {
        Swal.fire({
            title: "Atenção",
            text: `Tem certeza que deseja excluir o produto '${item.name}'?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#007c06",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirmar",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const product = await deleteProductFeedstock(item.id);
                    Swal.fire("Excluído", product.response.data, "success");
                } catch (e) {
                    Swal.fire("Atenção", e.response.data, "warning");
                } finally {
                    didMount();
                }
            }
        });
    }, []);

    const columns = useMemo(
        () => [
            {
                field: "id",
                label: "Código",
                col: {
                    xs: 1,
                },
            },
            {
                field: "productName",
                label: "Produto",
                col: {
                    xs: 3,
                    lg: 4,
                },
            },
            {
                field: "feedstockName",
                label: "Matéria-prima",
                col: {
                    xs: 3,
                },
            },
            {
                field: "min_quantity",
                label: "Qtd. mínima",
                col: {
                    xs: 2,
                },
            },
        ],
        []
    );

    useEffect(() => {
        didMount();
    }, []);

    return (
        <Container>
            <Crud
                title="Gerenciar cadastro de matéria-prima para um produto"
                rows={productFeedstock}
                columns={columns}
                handleEdit={onEdit}
                handleDelete={onDelete}
                handleNewItem={() => setOpenModal(true)}
            />
            {openModal && (
                <ModalCrud
                    title="Cadastrar uma nova materia prima para um produto"
                    isOpen={openModal}
                    handleCancel={() => {
                        setSelectedRow(initialValue);
                        setOpenModal(false);
                    }}
                    handleSave={handleSubmit}
                >
                    <Box mt={1}>
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="product-label">Produto</InputLabel>
                                    <Select
                                        labelId="product-label"
                                        id="product"
                                        name="product_id"
                                        value={selectedRow.product_id || ""}
                                        label="Produto"
                                        onChange={handleChange}
                                    >
                                        {products.map((item) => (
                                            <MenuItem
                                                key={`menuitem-product-${item.id}`}
                                                value={item.id}
                                            >
                                                {item.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="feedstock-label">Matéria-prima</InputLabel>
                                    <Select
                                        labelId="feedstock-label"
                                        id="feedstock"
                                        name="feedstock_id"
                                        value={selectedRow.feedstock_id || ""}
                                        label="Produto"
                                        onChange={handleChange}
                                    >
                                        {feedstocks.map((item) => (
                                            <MenuItem
                                                key={`menuitem-feedstock-${item.id}`}
                                                value={item.id}
                                            >
                                                {item.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        name="min_quantity"
                                        label="Quantidade"
                                        type="number"
                                        onChange={handleChange}
                                        value={selectedRow.min_quantity || ""}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Box>
                </ModalCrud>
            )}
        </Container>
    );
};

export default ProductFeedstock;
