'use client'
import React, { Fragment } from 'react'
import { ThemeButtonStyle } from './style'
import { BsFillSunFill, BsMoonStarsFill } from 'react-icons/bs'

type ThemeButtonProps = {
    theme: string,
    toggleTheme: () => void,
}

const ThemeButton: React.FC<ThemeButtonProps> = ({ theme, toggleTheme }) => {
    return (
        <Fragment>
            <ThemeButtonStyle className={theme} onClick={toggleTheme}>
                <div className="icon">
                    {
                        theme === 'dark' ?
                            (
                                <Fragment>
                                    <BsFillSunFill />
                                </Fragment>
                            ) : <Fragment>
                                <BsMoonStarsFill />
                            </Fragment>
                    }
                </div>
            </ThemeButtonStyle>
        </Fragment>
    )
}

export default React.memo(ThemeButton);
