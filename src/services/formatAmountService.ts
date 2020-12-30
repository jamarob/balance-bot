const formatAmount = (amount : number) : string => {
  return `${amount >= 0 ? '+' : ''}${amount.toFixed(2).replace('.',',')}€`
}

export default formatAmount