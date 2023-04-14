import { MouseEvent, useRef, useState } from 'react'
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher'
import { calc } from '../../utils/calc'

import style from './Calculator.module.css'

export default function Calculcator(): JSX.Element {
    const [displayValue, setDisplayValue] = useState('0')
    const memory = useRef('')
    const decimalPointFlag = useRef(false)
    const displayResetFlag = useRef(false) // reset the display before the next input
    const operation = useRef('')

    function handleBtnsPanelClick(e: MouseEvent) {
        const btn = e.target as HTMLElement
        switch (btn.innerText.toLowerCase()) {
            case '0':
                if (displayResetFlag.current) {
                    displayResetFlag.current = false
                    setDisplayValue(btn.innerText)
                    break
                }
                setDisplayValue(prevValue => {
                    if (prevValue === '0')
                        return decimalPointFlag.current ? prevValue + btn.innerText : prevValue
                    return prevValue + btn.innerText
                })
                break;
            case '1': case '2': case '3': case '4': case '5': case '6': case '7': case '8': case '9':
                if (displayResetFlag.current) {
                    setDisplayValue(btn.innerText)
                    displayResetFlag.current = false
                    break;
                }
                setDisplayValue(prevValue => {
                    if (prevValue === '0')
                        return decimalPointFlag.current ? prevValue + btn.innerText : btn.innerText
                    return prevValue + btn.innerText
                })
                break;
            case '.':
                if (!decimalPointFlag.current) {
                    if (displayResetFlag.current) {
                        displayResetFlag.current = false
                        decimalPointFlag.current = true
                        setDisplayValue('0.')
                    }
                    else {
                        decimalPointFlag.current = true
                        setDisplayValue(prevValue => prevValue + '.')
                    }
                }
                break;
            case '+': case '-': case '✕': case '/':
                if (operation.current === '')
                    memory.current = displayValue
                else if (!displayResetFlag.current) {
                    const res = String(calc(Number(memory.current), Number(displayValue), operation.current))
                    memory.current = res
                    setDisplayValue(res)
                }
                operation.current = btn.innerText
                displayResetFlag.current = true
                decimalPointFlag.current = false
                break
            case '=':
                if (memory.current !== '' && !displayResetFlag.current) {
                    setDisplayValue(String(calc(Number(memory.current), Number(displayValue), operation.current)))
                    displayResetFlag.current = true
                    decimalPointFlag.current = false
                    operation.current = ''
                }
                break
            case 'del':
                if (displayResetFlag.current)
                    break;
                if (displayValue.length > 1) {
                    if (displayValue[displayValue.length - 1] === '.')
                        decimalPointFlag.current = false
                    setDisplayValue(prevValue => prevValue.slice(0, prevValue.length - 1))
                }
                else {
                    setDisplayValue('0')
                }
                break
            case 'reset':
                memory.current = ''
                operation.current = ''
                decimalPointFlag.current = false
                setDisplayValue('0')
                break
        }
    }

    return (
        <div className={style.calculator}>
            <div className={style.topPanel}>
                <h2 className={style.appName}>calc</h2>
                <div className={style.themeSwitcherWrapper}>
                    <ThemeSwitcher />
                </div>
            </div>
            <label className='sr-only' htmlFor="display">display</label>
            <input
                id="display"
                className={style.display}
                type="text"
                readOnly={true}
                size={1}
                value={displayValue}
                aria-label="display"
            />
            <div className={style.btnsPanel} onClick={handleBtnsPanelClick}>
                <button className={style.btn}>7</button>
                <button className={style.btn}>8</button>
                <button className={style.btn}>9</button>
                <button className={style.specialBtn}>del</button>
                <button className={style.btn}>4</button>
                <button className={style.btn}>5</button>
                <button className={style.btn}>6</button>
                <button className={style.btn}>+</button>
                <button className={style.btn}>1</button>
                <button className={style.btn}>2</button>
                <button className={style.btn}>3</button>
                <button className={style.btn}>-</button>
                <button className={style.btn}>.</button>
                <button className={style.btn}>0</button>
                <button className={style.btn}>/</button>
                <button className={style.btn}>✕</button>
                <button className={`${style.resetBtn} ${style.specialBtn}`}>reset</button>
                <button className={style.eqBtn}>=</button>
            </div>
        </div>
    )
}