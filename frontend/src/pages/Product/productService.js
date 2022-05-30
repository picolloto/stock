import { remove, edit, insert, get } from "../../shared/Api";

const URL_DEFAULT = "/product";

export const getProducts = async () => get(URL_DEFAULT);

export const deleteProduct = async (id) => {
    const url = `${URL_DEFAULT}/${id}`;
    return remove(url);
};
export const editProduct = async (id, data) => {
    const url = `${URL_DEFAULT}/${id}`;
    return edit(url, data);
};
export const insertProduct = async (data) => insert(URL_DEFAULT, data);
