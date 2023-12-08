import { Reducer } from "react"
import { UPDATE_LOCALE_SLUG } from "../ActionTypes"
import { LocaleStateType } from "@/src/types"


const initialState: LocaleStateType[] = [
    {
        locale: 'az',
        slug: ''
    },
    {
        locale: 'en',
        slug: '',
    },
    {
        locale: 'ru',
        slug: '',
    },
]

const LocaleReducer: Reducer<LocaleStateType[], any> = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_LOCALE_SLUG:
            return [...action.payload]
        default:
            return state;
    }
}
export default LocaleReducer;