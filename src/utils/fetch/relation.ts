export const fetchProductAttributeRelationData = async () => {
    const res = await fetch(`${process.env.BASE_URL}/api/relation/product_attribute`);
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}
export const fetchProductCategoryRelationData = async () => {
    const res = await fetch(`${process.env.BASE_URL}/api/relation/product_category`);
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}
export const fetchProductColorRelationData = async () => {
    const res = await fetch(`${process.env.BASE_URL}/api/relation/product_color`);
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}
export const fetchProductWeightRelationData = async () => {
    const res = await fetch(`${process.env.BASE_URL}/api/relation/product_weight`);
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}