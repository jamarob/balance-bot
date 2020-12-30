import { PaymentDocument } from "./Payment"

export default class PaymentMap extends Map<string, number> {
  
  static of(payments: PaymentDocument[]): PaymentMap {
    const map = new PaymentMap()
    for(let payment of payments){
      map.add(payment.by, payment.amount)
    }
    return map
  }
  
  add(user: string, amount: number) {
    this.set(user, (this.get(user) ?? 0) + amount)
  }

  total(): number {
    let sum = 0
    for (let [user,amount] of this) {
      sum += amount
    }
    return sum
  }

  average(): number {
    return this.size ? this.total() / this.size : 0
  }

  balances(): PaymentMap {
    const balances = new PaymentMap()
    const average = this.average()
    for (let [user, amount] of this) {
      balances.set(user, amount - average)
    }
    return balances
  }

}
