import { remove, edit, insert, get } from "../../shared/Api";

export const getProducts = async () => {
    const url = "/product";
    return get(url);
};

export const deleteProduct = async (id) => {
    const url = `/product/${id}`;
    return remove(url);
};
export const editProduct = async (id, data) => {
    const url = `/product/${id}`;
    return edit(url, data);
};
export const insertProduct = async (data) => {
    const url = `/product`;
    return insert(url, data);
};
