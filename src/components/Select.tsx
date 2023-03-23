import { useEffect, useRef, useState } from 'react';
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

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) setHighlightedIdx(0);
    }, [isOpen]);

    useEffect(() => {
        const handler = (event: KeyboardEvent) => {
            console.log('run');
            
            if (event.target != containerRef.current) return;
            switch (event.code) {
                case 'Enter':
                case 'Space':
                    setIsOpen(prevState => !prevState);
                    if (isOpen) selectOption(options[highlightedIdx]);
                    break;
                case 'ArrowUp':
                case 'ArrowDown':
                    if (!isOpen) {
                        setIsOpen(true);
                        break;
                    }
                    const newValue = highlightedIdx + (event.code === 'ArrowDown' ? 1 : -1);
                    if (newValue >= 0 && newValue < options.length) setHighlightedIdx(newValue);
                    break;
                case 'Escape':
                    setIsOpen(false);
                    break;
            };
        }
        containerRef.current?.addEventListener('keydown', handler);

        return () => {
            containerRef.current?.removeEventListener('keydown', handler);
        }
    }, [isOpen, highlightedIdx, options]);

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
            ref={containerRef}
            onBlur={() => setIsOpen(false)}
            onClick={() => setIsOpen(prevState => !prevState)}
        >
            <div className={styles['value']}>{multiple ?
                value.map((val, idx) => {
                    return <button
                        key={idx}
                        className={styles['option-badge']}
                        onClick={event => {
                            event.stopPropagation();
                            selectOption(val);
                        }}
                    >{val.label}<div className={styles['remove-btn']}>&times;</div></button>
                })
                : value?.label}
            </div>
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
