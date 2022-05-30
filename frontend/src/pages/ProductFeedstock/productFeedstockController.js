export const processProductFeedstock = (productFeedstock) => {
    const newProductFeedstockList = productFeedstock.map((item) => ({
        ...item,
        productName: item.product_id.name,
        feedstockName: item.feedstock_id.name,
    }));

    return newProductFeedstockList;
};
