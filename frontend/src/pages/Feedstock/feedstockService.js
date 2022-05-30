import { edit, get, insert, remove } from "../../shared/Api";

const URL_DEFAULT = "/feedstock";

export const getFeedstocks = async () => get(URL_DEFAULT);

export const editFeedstock = async (id, data) => {
    const url = `${URL_DEFAULT}/${id}`;
    return edit(url, data);
};
export const insertFeedstock = async (data) => insert(URL_DEFAULT, data);

export const deleteFeedstock = (id) => {
    const url = `${URL_DEFAULT}/${id}`;
    return remove(url);
};
