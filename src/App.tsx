import { useState } from 'react';
import Select, { SelectOption } from './components/Select';

import './App.css';

const options = [
    { label: 'One', value: 1 },
    { label: 'Two', value: 2 },
    { label: 'Three', value: 3 },
    { label: 'Four', value: 4 },
    { label: 'Five', value: 5 },
    { label: 'Six', value: 6 },
    { label: 'Seven', value: 7 },
    { label: 'Eight', value: 8 },
    { label: 'Nine', value: 9 },
    { label: 'Ten', value: 10 }
]

const App = () => {

    const [singleSelectValue, setSingleSelectValue] = useState<SelectOption | undefined>(options[0]);
    const [multipleSelectValue, setMultipleSelectValue] = useState<SelectOption[]>([options[0]]);

    return (
        <>
            <h1>React Custom Select</h1>
            <br />
            <Select options={options} value={singleSelectValue} onChange={option => setSingleSelectValue(option)} />
            <br />
            <Select multiple options={options} value={multipleSelectValue} onChange={option => setMultipleSelectValue(option)} />
        </>
    );
}

export default App;
