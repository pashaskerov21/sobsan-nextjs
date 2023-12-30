'use client'
import React from 'react'
import { DarkTheme } from '../styles';
import { LightTheme } from '../styles';
import GlobalStyles from '../styles/global';
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/scss/index.scss';
import { Fancybox } from '@fancyapps/ui';
import { ThemeProvider } from 'styled-components';
import { SiteToolbar } from '../components';
import { RootLayoutProps } from '../types';
import { Footer, Header } from '../partials';
import { Provider } from 'react-redux';
import store from '../redux/store';
import Cookies from 'js-cookie';
import { useDarkMode } from 'usehooks-ts';



const RootLayout: React.FC<RootLayoutProps> = ({
    activeLocale,
    categoryData,
    categoryTranslateData,
    children,
    filialData,
    filialTranslateData,
    menuData,
    menuTranslateData,
    settingData,
    settingTranslateData,
    titleDictionary,
}) => {
    React.useEffect(() => { Fancybox.bind("[data-fancybox]", {}) }, []);
    const themes = ['dark','light']
    const defaultThemeValue = themes.includes(settingData.theme) ? settingData.theme : themes[0];
    const { isDarkMode, toggle } = useDarkMode(defaultThemeValue === themes[0] ? true : false);
    const activeTheme = isDarkMode ? DarkTheme : LightTheme;
    const activeThemeValue = isDarkMode ? themes[0] : themes[1]; 
    


    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <React.Fragment>
            <Provider store={store}>
                <ThemeProvider theme={activeTheme}>
                    <GlobalStyles />
                        <SiteToolbar
                            loading={loading}
                            settingData={settingData}
                            titleDictionary={titleDictionary}
                        />
                        <Header
                            loading={loading}
                            activeLocale={activeLocale}
                            categoryData={categoryData}
                            categoryTranslateData={categoryTranslateData}
                            menuData={menuData}
                            menuTranslateData={menuTranslateData}
                            settingData={settingData}
                            settingTranslateData={settingTranslateData}
                            theme={activeThemeValue}
                            titleDictionary={titleDictionary}
                            toggleTheme={toggle}
                        />
                        <main>
                            {children}
                        </main>
                        <Footer
                            loading={loading}
                            activeLocale={activeLocale}
                            categoryData={categoryData}
                            categoryTranslateData={categoryTranslateData}
                            filialData={filialData}
                            filialTranslateData={filialTranslateData}
                            menuData={menuData}
                            menuTranslateData={menuTranslateData}
                            settingData={settingData}
                            settingTranslateData={settingTranslateData}
                            titleDictionary={titleDictionary}
                        />
                </ThemeProvider>
            </Provider>
        </React.Fragment>
    )
}

export default RootLayout
