import { ChangeEvent, useEffect, useState } from 'react'

import style from './ThemeSwitcher.module.css'

export default function ThemeSwitcher(): JSX.Element {
    const [currentThemeClassName, setCurrentThemeClassName] = useState(`${localStorage.getItem('theme')}-theme`)

    useEffect(() => {
        document.body.classList.add(currentThemeClassName)
    })

    function handleRadio1OnChange(e: ChangeEvent) {
        document.body.classList.remove(currentThemeClassName)
        document.body.classList.add('default-theme')
        localStorage.setItem('theme', 'default')
        setCurrentThemeClassName('default-theme')
    }

    function handleRadio2OnChange(e: ChangeEvent) {
        document.body.classList.remove(currentThemeClassName)
        document.body.classList.add('light-theme')
        localStorage.setItem('theme', 'light')
        setCurrentThemeClassName('light-theme')
    }

    function handleRadio3OnChange(e: ChangeEvent) {
        document.body.classList.remove(currentThemeClassName)
        document.body.classList.add('dark-theme')
        localStorage.setItem('theme', 'dark')
        setCurrentThemeClassName('dark-theme')
    }

    return (
        <div className={style.themeSwitcherWrapper}>
            <span className={style.label}>theme</span>
            <div className={style.themeSwitcher}>
                <input
                    className={style.radioBtn}
                    type="radio"
                    name="themeSwitcher" aria-label="default theme"
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