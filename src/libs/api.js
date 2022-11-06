const FIREBASE_DOMAIN = "https://denim-1aa45-default-rtdb.firebaseio.com";

const matchQuery = (query) => {
    let params = "";

    switch (query.type) {
        case "woman":
            params = `?orderBy="gender"&equalTo="female"`;
            break;
        case "man":
            params = `?orderBy="gender"&equalTo="male"`;
            break;
        case "jackets":
            params = `?orderBy="kind"&equalTo="jacket"`;
            break;
        case "overalls":
            params = `?orderBy="kind"&equalTo="overalls"`;
            break;
        case "new":
            params = `?orderBy="new"&equalTo=true`;
            break;
        case "bestsellers":
            params = `?orderBy="bestseller"&equalTo=true`;
            break;
        default:
            params = "";
    }

    return `${params}${query.limit ? query.limit : ""}`;
};

export async function getProducts(query = {}) {
    const params = matchQuery(query);
    const response = await fetch(`${FIREBASE_DOMAIN}/products.json${params}`);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Could not fetch products.");
    }

    // console.log(data);

    const transformedProducts = [];

    for (const key in data) {
        const product = {
            id: key,
            ...data[key],
        };

        transformedProducts.push(product);
    }

    return transformedProducts;
}

export async function getSingleProduct(productID) {
    const response = await fetch(
        `${FIREBASE_DOMAIN}/products/${productID}.json`
    );
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Could not fetch quote.");
    }

    const loadedProduct = {
        id: productID,
        ...data,
    };

    return loadedProduct;
}

// export async function addQuote(quoteData) {
//     const response = await fetch(`${FIREBASE_DOMAIN}/quotes.json`, {
//         method: "POST",
//         body: JSON.stringify(quoteData),
//         headers: {
//             "Content-Type": "application/json",
//         },
//     });
//     const data = await response.json();

//     if (!response.ok) {
//         throw new Error(data.message || "Could not create quote.");
//     }

//     return null;
// }

// export async function addComment(requestData) {
//     const response = await fetch(
//         `${FIREBASE_DOMAIN}/comments/${requestData.quoteID}.json`,
//         {
//             method: "POST",
//             body: JSON.stringify(requestData.commentData),
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         }
//     );
//     const data = await response.json();

//     if (!response.ok) {
//         throw new Error(data.message || "Could not add comment.");
//     }

//     return { commentId: data.name };
// }

// export async function getAllComments(quoteId) {
//     const response = await fetch(`${FIREBASE_DOMAIN}/comments/${quoteId}.json`);

//     const data = await response.json();

//     if (!response.ok) {
//         throw new Error(data.message || "Could not get comments.");
//     }

//     const transformedComments = [];

//     for (const key in data) {
//         const commentObj = {
//             id: key,
//             ...data[key],
//         };

//         transformedComments.push(commentObj);
//     }

//     return transformedComments;
// }
