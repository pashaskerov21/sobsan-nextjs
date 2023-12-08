import { UPDATE_LOCALE_SLUG } from "../ActionTypes"

export const updateLocaleSlug = (data: any) => {
    return{
        type: UPDATE_LOCALE_SLUG,
        payload: data,
    }
}
