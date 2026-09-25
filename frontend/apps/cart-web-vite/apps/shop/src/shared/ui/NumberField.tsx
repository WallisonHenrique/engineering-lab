import "./NumberField.css"

interface NumberFieldProps {
    value: number
    min?: number
    max?: number
    step?: number
    onChange: (value: number) => void
}

function NumberField({value, min = 0, max = 99, step = 1, onChange}: NumberFieldProps) {
    const handleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        let result = Number(e.target.value)

        if (result < min) result = min
        if (result > max) result = max

        onChange(result)
    }

    return (
        <div className="number-field">
            <button 
                className="number-field-controls"
                type="button"
                disabled={value === min}
                onClick={() => onChange(value - step)}
            >
                -
            </button>
            <input 
                className="number-field-input" 
                value={value} 
                type="text"
                onChange={handleValue} 
            />
            <button 
                className="number-field-controls"
                type="button"
                disabled={value === max} 
                onClick={() => onChange(value + step)}
            >
                +
            </button>
        </div>
    )
}

export default NumberField