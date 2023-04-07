import { ChangeEvent, useEffect, useState } from 'react'

import style from './ThemeSwitcher.module.css'

export default function ThemeSwitcher(): JSX.Element {
    const [currentThemeClassName, setCurrentThemeClassName] = useState(() => {
        const themeName = localStorage.getItem('theme')
        if (themeName)
            return `${themeName}-theme`
        return 'default-theme'
    })

    /* eslint-disable */
    useEffect(() => {
        document.body.classList.add(currentThemeClassName)
    }, [])
    /* eslint-enable */

    function setTheme(themeName: string) {
        const themeClassName = `${themeName}-theme`
        document.body.classList.remove(currentThemeClassName)
        document.body.classList.add(themeClassName)
        localStorage.setItem('theme', themeName)
        setCurrentThemeClassName(themeClassName)
    }

    function handleRadio1OnChange(e: ChangeEvent) {
        setTheme('default')
    }

    function handleRadio2OnChange(e: ChangeEvent) {
        setTheme('light')
    }

    function handleRadio3OnChange(e: ChangeEvent) {
        setTheme('dark')
    }

    return (
        <div className={style.themeSwitcherWrapper}>
            <span className={style.label}>theme</span>
            <div className={style.themeSwitcher}>
                <input
                    className={style.radioBtn}
                    type="radio"
                    name="themeSwitcher"
                    aria-label="default theme"
                    checked={currentThemeClassName === 'default-theme'}
                    onChange={handleRadio1OnChange}
                />
                <input
                    className={style.radioBtn}
                    type="radio"
                    name="themeSwitcher"
                    aria-label="light theme"
                    checked={currentThemeClassName === 'light-theme'}
                    onChange={handleRadio2OnChange}
                />
                <input
                    className={style.radioBtn}
                    type="radio"
                    name="themeSwitcher"
                    aria-label="dark theme"
                    checked={currentThemeClassName === 'dark-theme'}
                    onChange={handleRadio3OnChange}
                />
                <div className={style.switcher}></div>
            </div>
        </div >
    )
}