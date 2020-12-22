import { Payment, PaymentDocument } from '../models/Payment'

export const getBalances = async () => {
  const payments: PaymentDocument[] = await Payment.find()
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

export const addPayment = async (user: string, amount: number) => {
  const payment = new Payment({ by: user, amount, date: new Date() })
  return await payment.save()
}
