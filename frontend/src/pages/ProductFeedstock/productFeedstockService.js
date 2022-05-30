import { edit, get, insert, remove } from "../../shared/Api";

const URL_DEFAULT = "/productfeedstock";

export const getProductFeedstocks = () => get(URL_DEFAULT);

export const insertProductFeedstock = (data) => insert(URL_DEFAULT, data);

export const editProductFeedstock = async (id, data) => {
    const url = `${URL_DEFAULT}/${id}`;
    return edit(url, data);
};

export const deleteProductFeedstock = async (id) => {
    const url = `${URL_DEFAULT}/${id}`;
    return remove(url);
};
