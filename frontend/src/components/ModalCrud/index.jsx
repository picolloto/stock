import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import PropTypes from "prop-types";

const ModalCrud = ({ children, title, isOpen, handleSave, handleCancel }) => (
    <div>
        <Dialog open={isOpen} onClose={handleCancel}>
            <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
            <DialogContent>{children}</DialogContent>
            <DialogActions>
                <Button variant="contained" color="error" autoFocus onClick={handleCancel}>
                    Cancelar
                </Button>
                <Button variant="contained" color="success" onClick={handleSave} autoFocus>
                    Salvar
                </Button>
            </DialogActions>
        </Dialog>
    </div>
);

ModalCrud.propTypes = {
    children: PropTypes.any.isRequired,
    title: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    handleCancel: PropTypes.func,
    handleSave: PropTypes.func,
};

ModalCrud.defaultProps = {
    handleCancel: () => {},
    handleSave: () => {},
};

export default ModalCrud;
