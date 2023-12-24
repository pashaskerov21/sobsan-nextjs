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
    React.useEffect(() => { Fancybox.bind("[data-fancybox]", {}) }, [])
    const [theme, setTheme] = React.useState<string>(`dark`);
    const toggleTheme = React.useCallback(() => {
        if (theme === 'dark') {
            setTheme('light');
        } else {
            setTheme('dark')
        }
    }, [theme])

    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        setLoading(false);
    });


    return (
        <React.Fragment>
            <Provider store={store}>
                <ThemeProvider theme={theme === 'dark' ? DarkTheme : LightTheme}>
                    <GlobalStyles />
                    <body>
                        {loading && <div className='preloader'></div>}
                        <SiteToolbar
                            settingData={settingData}
                            titleDictionary={titleDictionary}
                        />
                        <Header
                            activeLocale={activeLocale}
                            categoryData={categoryData}
                            categoryTranslateData={categoryTranslateData}
                            menuData={menuData}
                            menuTranslateData={menuTranslateData}
                            settingData={settingData}
                            settingTranslateData={settingTranslateData}
                            theme={theme}
                            titleDictionary={titleDictionary}
                            toggleTheme={toggleTheme}
                        />
                        <main>
                            {children}
                        </main>
                        <Footer
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
                    </body>
                </ThemeProvider>
            </Provider>
        </React.Fragment>
    )
}

export default RootLayout
