
// ARTICLE TYPES
// about --- 1
// color system --- 2
// payment delivery --- 3
// warranty condition --- 4
// news --- 5
// actions --- 6
// master content --- 7


import { ArticleDataType } from "../types";

const ArticleData: ArticleDataType[] = [
    {
        id: 1,
        type: 1,
        image: '/text/about-1.webp',
    },
    {
        id: 2,
        type: 1,
        image: '/text/about-2.webp',
    },
    {
        id: 3,
        type: 2,
        image: '/text/color-system.webp',
    },
    {
        id: 4,
        type: 3,
        image: '/text/payment-delivery.webp',
    },
    {
        id: 5,
        type: 4,
        image: '/text/warranty-condition.webp',
    },
    {
        id: 6,
        type: 5,
        image: '/news/image-1.webp',
    },
    {
        id: 7,
        type: 7,
        image: '',
    },
]
export default ArticleData;