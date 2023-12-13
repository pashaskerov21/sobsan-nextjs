import { LocaleType } from ".."

export type RootStateType = {
    localeState: LocaleStateType[],
}
export type LocaleStateType = {
    locale: LocaleType,
    slug: string,
}


