import { useEffect, useState } from 'react';
import styles from './select.module.css';

export type SelectOption = { label: string, value: string | number }

type SingleSelectProps = {
    multiple?: false,
    value?: SelectOption,
    onChange: (value?: SelectOption) => void
}

type MultipleSelectProps = {
    multiple: true,
    value: SelectOption[],
    onChange: (value: SelectOption[]) => void
}

type SelectProps = {
    options: SelectOption[]
} & (SingleSelectProps | MultipleSelectProps);

const Select = ({ options, value, multiple, onChange }: SelectProps) => {

    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIdx, setHighlightedIdx] = useState(0);

    useEffect(() => {
        if (isOpen) setHighlightedIdx(0);
    }, [isOpen]);

    const clearOption = () => {
        multiple ? onChange([]) : onChange(undefined);
    }

    const selectOption = (option: SelectOption) => {
        if (multiple) {
            if (value.includes(option)) {
                onChange(value.filter(el => el !== option))
            } else {
                onChange([...value, option]);
            }
        } else {
            if (option !== value) onChange(option);
        }
    }

    const isOptionSelected = (option: SelectOption) => {
        return multiple ? value.includes(option) : option === value;
    }

    return (
        <div
            className={styles['container']}
            tabIndex={0}
            onBlur={() => setIsOpen(false)}
            onClick={() => setIsOpen(prevState => !prevState)}
        >
            <span className={styles['value']}>{multiple ?
                value.map((val, idx) => {
                    return <button
                        key={idx}
                        className={styles['option-badge']}
                        onClick={event => {
                            event.stopPropagation();
                            selectOption(val);
                        }}
                    >{val.label}<span className={styles['remove-btn']}>&times;</span></button>
                })
                : value?.label}
            </span>
            <button
                className={styles['clear-btn']}
                onClick={event => {
                    event.stopPropagation();
                    clearOption();
                }}
            >&times;</button>
            <div className={styles['divider']}></div>
            <div className={styles['caret']}></div>
            <ul className={`${styles['option-list']} ${isOpen ? styles['show'] : ''}`}>
                {options.map((option, idx) => {
                    return <li
                        key={idx}
                        className={`${styles['option']} ${isOptionSelected(option) ? styles['selected'] : ''} ${idx === highlightedIdx ? styles['highlighted'] : ''}`}
                        onMouseEnter={() => setHighlightedIdx(idx)}
                        onClick={event => {
                            event.stopPropagation();
                            selectOption(option);
                            setIsOpen(false);
                        }}
                    >{option.label}</li>
                })}
            </ul>
        </div>
    );
}

export default Select;
