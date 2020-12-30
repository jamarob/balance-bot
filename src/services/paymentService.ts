import { Payment, PaymentDocument } from '../models/Payment'
import PaymentMap from '../models/PaymentMap'
import formatAmount from './formatAmountService';

export const getBalances = async () => {
  const payments: PaymentDocument[] = await Payment.find()
  const balances = PaymentMap.of(payments).balances();
  if(!balances.size) {
    return 'no payments'
  }
  const replyParts = []
  for(let [user,amount] of balances){
    replyParts.push(`${user}: ${formatAmount(amount)}`)
  }
  return replyParts.join("\n")
}

export const addPayment = async (user: string, amount: number) => {
  const payment = new Payment({ by: user, amount, date: new Date() })
  await payment.save()
  return getBalances()
}
