import { PaymentDocument } from '../models/Payment'

export const getBalances = (payments: PaymentDocument[]) => {
  const balances = new Map<string, number>()

  payments.forEach((payment) => {
    const oldAmount = balances.get(payment.by)
    const newAmount = (oldAmount ?? 0) + payment.amount
    balances.set(payment.by, newAmount)
  })

  const highestAmount = Math.max(...balances.values())

  balances.forEach((amount, payer) => {
    balances.set(payer, amount - highestAmount)
  })

  return balances
}
