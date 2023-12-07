import { MenuDataType } from "../types";

const MenuData:MenuDataType[] = [
    {
        id: 1,
        parent_id: 0,
        path: '/about',
    },
    {
        id: 2,
        parent_id: 1,
        path: '/about/coloring-system',
    },
    {
        id: 3,
        parent_id: 0,
        path: '/catalogs',
    },
    {
        id: 4,
        parent_id: 0,
        path: '/media',
    },
    {
        id: 5,
        parent_id: 4,
        path: '/media/actions',
    },
    {
        id: 6,
        parent_id: 4,
        path: '/media/news',
    },
    {
        id: 7,
        parent_id: 4,
        path: '/media/gallery',
    },
    {
        id: 8,
        parent_id: 0,
        path: '/payment-and-delivery',
    },
    {
        id: 9,
        parent_id: 0,
        path: '/warranty-conditions',
    },
    {
        id: 10,
        parent_id: 0,
        path: '/contact',
    },
]

export default MenuData;