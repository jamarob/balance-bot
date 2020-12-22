import mongoose from 'mongoose'

export type PaymentDocument = mongoose.Document & {
  by: string
  amount: number
  date: Date
}

const paymentSchema = new mongoose.Schema({
  by: String,
  amount: Number,
  date: Date,
})

export const Payment = mongoose.model<PaymentDocument>('Payment', paymentSchema)
