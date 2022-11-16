export const filterProducts = (products, color, size, minPrice, maxPrice) => {
    const filtered = products
        ?.filter((item) =>
            color ? item.colors.includes(color) : item.colors.length
        )
        .filter((item) =>
            size ? item.sizes.includes(size) : item.sizes.length
        )
        .filter((item) => (minPrice ? item.price >= minPrice : item.price))
        .filter((item) => (maxPrice ? item.price <= maxPrice : item.price));

    return filtered;
};
