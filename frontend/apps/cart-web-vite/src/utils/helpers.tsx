const REAL = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
})

export function toCurrency(value: number) {
    return REAL.format(value)
}