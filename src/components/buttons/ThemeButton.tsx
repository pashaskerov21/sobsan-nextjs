import React from 'react'
import { ThemeButtonStyle } from './style'
import { BsFillSunFill, BsMoonStarsFill } from 'react-icons/bs'
import { ThemeButtonProps } from '@/src/types'


const ThemeButton:React.FC<ThemeButtonProps> = ({theme, toggleTheme}) => {
    return (
        <React.Fragment>
            <ThemeButtonStyle className={theme} onClick={toggleTheme}>
                <div className="icon">
                    {
                        theme === 'dark' ?
                            (
                                <React.Fragment>
                                    <BsFillSunFill />
                                </React.Fragment>
                            ) : <React.Fragment>
                                <BsMoonStarsFill />
                            </React.Fragment>
                    }
                </div>
            </ThemeButtonStyle>
        </React.Fragment>
    )
}

export default React.memo(ThemeButton);
