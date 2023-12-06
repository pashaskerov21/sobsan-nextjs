export const fetchArticleData = async () => {
    const res = await fetch(`${process.env.BASE_URL}/api/main/articles`);
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}
export const fetchAttributeGroupData = async () => {
    const res = await fetch(`${process.env.BASE_URL}/api/main/attribute_group`);
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}
export const fetchBannerData = async () => {
    const res = await fetch(`${process.env.BASE_URL}/api/main/banners`);
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}
export const fetchBrandData = async () => {
    const res = await fetch(`${process.env.BASE_URL}/api/main/brands`);
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}
export const fetchCatalogData = async () => {
    const res = await fetch(`${process.env.BASE_URL}/api/main/catalogs`);
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}
export const fetchCategoryData = async () => {
    const res = await fetch(`${process.env.BASE_URL}/api/main/categories`);
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}
export const fetchColorData = async () => {
    const res = await fetch(`${process.env.BASE_URL}/api/main/colors`);
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}
export const fetchFilialData = async () => {
    const res = await fetch(`${process.env.BASE_URL}/api/main/filials`);
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}
export const fetchGalleryData = async () => {
    const res = await fetch(`${process.env.BASE_URL}/api/main/gallery`);
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}
export const fetchMasterImagesData = async () => {
    const res = await fetch(`${process.env.BASE_URL}/api/main/master_images`);
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}
export const fetchMenuData = async () => {
    const res = await fetch(`${process.env.BASE_URL}/api/main/menu`);
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}
export const fetchPartnerData = async () => {
    const res = await fetch(`${process.env.BASE_URL}/api/main/partners`);
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}
export const fetchProductBannerData = async () => {
    const res = await fetch(`${process.env.BASE_URL}/api/main/product_banners`);
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}
export const fetchProductData = async () => {
    const res = await fetch(`${process.env.BASE_URL}/api/main/products`);
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}
export const fetchRoomData = async () => {
    const res = await fetch(`${process.env.BASE_URL}/api/main/rooms`);
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}
export const fetchSettingData = async () => {
    const res = await fetch(`${process.env.BASE_URL}/api/main/settings`);
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}
export const fetchWeightData = async () => {
    const res = await fetch(`${process.env.BASE_URL}/api/main/weights`);
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}