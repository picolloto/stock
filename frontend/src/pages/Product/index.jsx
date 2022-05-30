import { Box, Container, TextField, Grid, InputAdornment } from "@mui/material";

import { useCallback, useEffect, useMemo, useState } from "react";

import Swal from "sweetalert2";
import { deleteProduct, getProducts, insertProduct } from "./productService";
import Crud from "../../components/Crud";
import ModalCrud from "../../components/ModalCrud";

const Product = () => {
    const [products, setProducts] = useState([]);
    const initialValue = {
        name: "",
        value: 0,
    };
    const [selectedRow, setSelectedRow] = useState(initialValue);

    const [openModal, setOpenModal] = useState(false);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setSelectedRow((prevState) => ({ ...prevState, [name]: value }));
    }, []);

    const onEdit = useCallback(async (item) => {
        setOpenModal(true);
        setSelectedRow(item);
    }, []);

    const didMount = useCallback(async () => {
        const { data: productList } = await getProducts();
        setProducts(productList.content);
    }, []);

    const handleSubmit = useCallback(async () => {
        try {
            await insertProduct(selectedRow);
            didMount();
            setOpenModal(false);
            setSelectedRow(initialValue);
            if (!!selectedRow.id) {
                Swal.fire("Informação", "Produto cadastrado com sucesso.", "success");
            }
            Swal.fire("Informação", "Produto alterado com sucesso.", "success");
        } catch {
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
                    const product = await deleteProduct(item.id);
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
                    xs: 2,
                },
            },
            {
                field: "name",
                label: "Nome",
                col: {
                    xs: 3,
                    lg: 4,
                },
            },
            {
                field: "value",
                label: "Valor",
                col: {
                    xs: 3,
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
                title="Gerenciar cadastro de produto"
                rows={products}
                columns={columns}
                handleEdit={onEdit}
                handleDelete={onDelete}
                handleNewItem={() => setOpenModal(true)}
            />
            {openModal && (
                <ModalCrud
                    title="Cadastrar um novo produto"
                    isOpen={openModal}
                    handleCancel={() => setOpenModal(false)}
                    handleSave={handleSubmit}
                >
                    <Box mt={1}>
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <TextField
                                    name="name"
                                    label="Nome"
                                    onChange={handleChange}
                                    value={selectedRow.name || ""}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    name="value"
                                    label="Valor"
                                    type="number"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">R$</InputAdornment>
                                        ),
                                        inputMode: "numeric",
                                        pattern: "[0-9]*",
                                    }}
                                    onChange={handleChange}
                                    value={selectedRow.value || null}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </ModalCrud>
            )}
        </Container>
    );
};

export default Product;
