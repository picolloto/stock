import { Box, Container, Grid, TextField } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import { deleteFeedstock, getFeedstocks, insertFeedstock } from "./feedstockService";
import Crud from "../../components/Crud";
import ModalCrud from "../../components/ModalCrud";

const Feedstock = () => {
    const [feedstocks, setFeedstocks] = useState([]);
    const initialValue = {
        name: "",
        quantity: 0,
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
        const { data: feedstockList } = await getFeedstocks();
        setFeedstocks(feedstockList.content);
    }, []);

    const handleSubmit = useCallback(async () => {
        try {
            await insertFeedstock(selectedRow);
            didMount();
            setOpenModal(false);
            setSelectedRow(initialValue);
            if (!!selectedRow.id) {
                Swal.fire("Informação", "Matéria-prima cadastrada com sucesso.", "success");
            }
            Swal.fire("Informação", "Matéria-prima alterada com sucesso.", "success");
        } catch {
            Swal.fire(
                "Atenção",
                "Ocorreu um problema inesperado ao salvar a matéria-prima!",
                "warning"
            );
        }
    }, [selectedRow]);

    const onDelete = useCallback((item) => {
        Swal.fire({
            title: "Atenção",
            text: `Tem certeza que deseja excluir a matéria-prima '${item.name}'?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#007c06",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirmar",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const feedstock = await deleteFeedstock(item.id);
                    Swal.fire("Atenção", feedstock.response.data, "success");
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
                field: "quantity",
                label: "Quantidade",
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
                title="Gerenciar cadastro de materia-prima"
                rows={feedstocks}
                columns={columns}
                handleEdit={onEdit}
                handleDelete={onDelete}
                handleNewItem={() => setOpenModal(true)}
            />
            {openModal && (
                <ModalCrud
                    title="Cadastrar uma nova matéria-prima"
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
                                    name="quantity"
                                    label="Quantidade"
                                    type="number"
                                    InputProps={{
                                        inputMode: "numeric",
                                        pattern: "[0-9]*",
                                    }}
                                    onChange={handleChange}
                                    value={selectedRow.quantity || null}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </ModalCrud>
            )}
        </Container>
    );
};

export default Feedstock;
