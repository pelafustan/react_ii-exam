const CURRENCY_FORMATTER = new Intl.NumberFormat("es-CL", {
  currency: "CLP",
  style: "currency",
  currencyDisplay: "symbol"
})

export function formatCurrency(currency: number) {
  return CURRENCY_FORMATTER.format(currency)
}
