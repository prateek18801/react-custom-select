import { useState } from 'react';
import Select, { SelectOption } from './components/Select';

const options = [
    { label: 'First', value: 1 },
    { label: 'Second', value: 2 },
    { label: 'Third', value: 3 },
    { label: 'Fourth', value: 4 },
    { label: 'Fifth', value: 5 },
    { label: 'Sixth', value: 6 },
]

const App = () => {

    const [singleSelectValue, setSingleSelectValue] = useState<SelectOption | undefined>(options[0]);
    const [multipleSelectValue, setMultipleSelectValue] = useState<SelectOption[]>([options[0]]);

    return (
        <div className='App'>
            <Select options={options} value={singleSelectValue} onChange={option => setSingleSelectValue(option)} />
            <br />
            <Select multiple options={options} value={multipleSelectValue} onChange={option => setMultipleSelectValue(option)} />
        </div>
    );
}

export default App;
