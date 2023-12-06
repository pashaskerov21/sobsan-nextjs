export const fetchArticleTranslateData = async () => {
    const res = await fetch(`${process.env.BASE_URL}/api/translate/articles`);
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}
export const fetchAttributeGroupTranslateData = async () => {
    const res = await fetch(`${process.env.BASE_URL}/api/translate/attribute_group`);
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}
export const fetchBrandTranslateData = async () => {
    const res = await fetch(`${process.env.BASE_URL}/api/translate/brands`);
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}
export const fetchCatalogTranslateData = async () => {
    const res = await fetch(`${process.env.BASE_URL}/api/translate/catalogs`);
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}
export const fetchCategoryTranslateData = async () => {
    const res = await fetch(`${process.env.BASE_URL}/api/translate/categories`);
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}
export const fetchColorTranslateData = async () => {
    const res = await fetch(`${process.env.BASE_URL}/api/translate/colors`);
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}
export const fetchFilialTranslateData = async () => {
    const res = await fetch(`${process.env.BASE_URL}/api/translate/filials`);
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}
export const fetchMenuTranslateData = async () => {
    const res = await fetch(`${process.env.BASE_URL}/api/translate/menu`);
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}
export const fetchProductBannerTranslateData = async () => {
    const res = await fetch(`${process.env.BASE_URL}/api/translate/product_banners`);
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}
export const fetchProductTranslateData = async () => {
    const res = await fetch(`${process.env.BASE_URL}/api/translate/products`);
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}
export const fetchRoomTranslateData = async () => {
    const res = await fetch(`${process.env.BASE_URL}/api/translate/rooms`);
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}
export const fetchSettingTranslateData = async () => {
    const res = await fetch(`${process.env.BASE_URL}/api/translate/settings`);
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}