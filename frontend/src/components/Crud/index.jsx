import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { Button, ButtonGroup, Container, Grid, List, ListItem, ListItemText } from "@mui/material";
import PropTypes from "prop-types";
import { useMemo } from "react";

import "./Crud.scss";

const Crud = ({ columns, rows, handleEdit, handleDelete }) => {
    const keys = useMemo(() => {
        if (rows.length > 0) {
            return Object.keys(rows[0]);
        }
        return [];
    }, [rows]);

    return (
        <Container>
            <List
                sx={{
                    width: "100%",
                    position: "relative",
                    overflowX: "hidden",
                    maxHeight: 500,
                    padding: "5px",
                }}
            >
                <ListItem>
                    <Grid container spacing={2} className="grid-container-header">
                        {columns.map((column) => (
                            <Grid item {...column.col}>
                                <ListItemText>{column?.label || ""}</ListItemText>
                            </Grid>
                        ))}
                        <Grid item xs={3} lg={2}>
                            <Button variant="outlined" color="success">
                                <AddCircleOutlineIcon /> Adicionar
                            </Button>
                        </Grid>
                    </Grid>
                </ListItem>
                {rows.map((row) => (
                    <ListItem>
                        <Grid key={`grid-container-${row.id}`} container spacing={2}>
                            {keys.map((key, index) => {
                                if (!!columns[index]) {
                                    return (
                                        <Grid item key={`row-item-${key}`} {...columns[index]?.col}>
                                            <ListItemText>{row[key]}</ListItemText>
                                        </Grid>
                                    );
                                }
                                // eslint-disable-next-line react/jsx-no-useless-fragment
                                return <></>;
                            })}
                            <Grid item xs={3} lg={2}>
                                <ButtonGroup size="small">
                                    <Button onClick={() => handleEdit(row)}>
                                        <EditIcon />
                                    </Button>
                                    <Button color="error" onClick={() => handleDelete(row)}>
                                        <DeleteForeverIcon />
                                    </Button>
                                </ButtonGroup>
                            </Grid>
                        </Grid>
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

Crud.propTypes = {
    columns: PropTypes.array.isRequired,
    rows: PropTypes.array.isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
};

export default Crud;
