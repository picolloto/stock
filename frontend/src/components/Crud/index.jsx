import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import {
    Button,
    ButtonGroup,
    Container,
    Grid,
    List,
    ListItem,
    ListItemText,
    Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { useMemo } from "react";

import "./Crud.scss";

const Crud = ({ title, columns, rows, handleEdit, handleDelete, handleNewItem }) => {
    const keys = useMemo(() => {
        if (columns.length > 0) {
            return columns.map((row) => row.field);
        }
        return [];
    }, [rows]);

    return (
        <Container sx={{ marginTop: "20px" }}>
            <List
                sx={{
                    width: "100%",
                    position: "relative",
                    overflowX: "hidden",
                    maxHeight: 500,
                    padding: "5px",
                }}
            >
                <Typography sx={{ paddingBottom: "20px" }} align="center" variant="h4">
                    {title}
                </Typography>
                <ListItem>
                    <Grid container spacing={2} className="grid-container-header">
                        {columns.map((column) => (
                            <Grid key={`header-item-${column.field}`} item {...column.col}>
                                <ListItemText>{column?.label || ""}</ListItemText>
                            </Grid>
                        ))}
                        <Grid item xs={3} lg={2}>
                            <Button
                                variant="outlined"
                                color="success"
                                onClick={() => handleNewItem()}
                            >
                                <AddCircleOutlineIcon /> Adicionar
                            </Button>
                        </Grid>
                    </Grid>
                </ListItem>
                {rows.length > 0 && keys.length > 0 ? (
                    rows.map((row) => (
                        <ListItem key={`grid-container-${row.id}`}>
                            <Grid container spacing={2}>
                                {keys.map((key, index) => {
                                    if (!!columns[index]) {
                                        return (
                                            <Grid
                                                item
                                                key={`row-item-${key}`}
                                                {...columns[index]?.col}
                                            >
                                                <ListItemText>{row[key]}</ListItemText>
                                            </Grid>
                                        );
                                    }
                                    return null;
                                })}
                                <Grid item xs={3} lg={2}>
                                    <ButtonGroup size="small">
                                        <Button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                return handleEdit(row);
                                            }}
                                        >
                                            <EditIcon />
                                        </Button>
                                        <Button
                                            color="error"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                return handleDelete(row);
                                            }}
                                        >
                                            <DeleteForeverIcon />
                                        </Button>
                                    </ButtonGroup>
                                </Grid>
                            </Grid>
                        </ListItem>
                    ))
                ) : (
                    <Typography align="center">Nenhum registro encontrado.</Typography>
                )}
            </List>
        </Container>
    );
};

Crud.propTypes = {
    title: PropTypes.string.isRequired,
    columns: PropTypes.array.isRequired,
    rows: PropTypes.array.isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleNewItem: PropTypes.func.isRequired,
};

export default Crud;
