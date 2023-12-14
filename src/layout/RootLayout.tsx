'use client'
import React from 'react'
import darkTheme from '../styles/theme/dark';
import lightTheme from '../styles/theme/light';
import GlobalStyles from '../styles/global';
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
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


    // const defaultTheme = settingData.theme; 

    // const [theme, setTheme] = React.useState<string>(() => {
    //     if (typeof window !== 'undefined') {
    //         const savedTheme = localStorage.getItem('theme');
    //         if(savedTheme !== null){
    //             return savedTheme
    //         }else{
    //             return defaultTheme
    //         }
    //     }
    //     return defaultTheme; 
    // });
    // console.log(theme)

    // React.useEffect(() => {
    //     if (typeof window !== 'undefined') {
    //         localStorage.setItem('theme', theme);
    //     }
        
    // }, [theme]);

    // const toggleTheme = React.useCallback(() => {
    //     setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
    // }, []);

    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        setLoading(false);
    });


    return (
        <React.Fragment>
            <Provider store={store}>
                <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
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
