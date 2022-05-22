import { Container } from "@mui/material";

import "./Product.scss";
import { useCallback, useEffect, useMemo, useState } from "react";

import { deleteProduct, getProducts } from "./productService";
import Crud from "../../components/Crud";
import ModalCrud from "../../components/ModalCrud";

const Product = () => {
    const [products, setProducts] = useState([]);
    const [selectedRow, setSelectedRow] = useState({});
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        const didMount = async () => {
            const { data } = await getProducts();

            setProducts(data.content);
        };

        didMount();
    }, []);

    const onEdit = useCallback((item) => {
        setOpenModal(true);
        setSelectedRow(item);
    }, []);

    const onDelete = useCallback(async (item) => {
        await deleteProduct(item.id);
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

    return (
        <Container>
            <Crud rows={products} columns={columns} handleEdit={onEdit} handleDelete={onDelete} />
            {openModal && (
                <ModalCrud
                    selectedRow={selectedRow}
                    isOpen={openModal}
                    onCancel={() => setOpenModal(false)}
                />
            )}
        </Container>
    );
};

export default Product;
