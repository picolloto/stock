import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import PropTypes from "prop-types";

const ModalCrud = ({ children, title, isOpen, handleSave, handleCancel }) => (
    <Dialog
        fullScreen
        open={isOpen}
        onClose={handleCancel}
        aria-labelledby="responsive-dialog-title"
    >
        <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
            <Button autoFocus onClick={handleCancel}>
                Cancelar
            </Button>
            <Button onClick={handleSave} autoFocus>
                Salvar
            </Button>
        </DialogActions>
    </Dialog>
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
