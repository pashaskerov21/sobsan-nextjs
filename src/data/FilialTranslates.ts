import { FilialTranslateDataType } from "../types";

const FilialTranslateData:FilialTranslateDataType[] = [
    {
        id: 1,
        filial_id: 1,
        lang: 'az',
        title: 'Baş ofis',
        address: 'Əhməd Rəcəbli / Esra Plaza A blok, 3. mərtəbə',
    },
    {
        id: 2,
        filial_id: 1,
        lang: 'en',
        title: 'Head office',
        address: 'Ahmad Rajabli Esra plaza',
    },
    {
        id: 3,
        filial_id: 1,
        lang: 'ru',
        title: 'Главный офис',
        address: 'Ахмад Раджабли Эсра Плаза',
    },
    {
        id: 4,
        filial_id: 2,
        lang: 'az',
        title: 'Fabrik ünvanı',
        address: 'Abşeron rayonu,  Aşağı Güzdək qəsəbəsi, Bakı-Şamaxı Şossesi, 17-ci km.',
    },
    {
        id: 5,
        filial_id: 2,
        lang: 'en',
        title: 'Factory address',
        address: 'Absheron district, Ashagi Guzdek settlement, Baku-Shamakhi highway - 17 km.',
    },
    {
        id: 6,
        filial_id: 2,
        lang: 'ru',
        title: 'Адрес завода',
        address: 'Абшеронский р-н. пос. Ашагы Гюздек, шоссе Баку-Шемаха,17-ый км.',
    },
]
export default FilialTranslateData;