import { privateInstance } from '../common/api/client-api'
import { endpoints } from '../common/api/endpoints'

class ClickService {
  // Initiates a Click deposit and returns the payment URL
  async initiateClickDeposit(amount: number) {
    const res = await privateInstance.post(
      endpoints.CLICK.INITIATE_DEPOSIT,
      { amount }
    )
    return res.data // { payment_url: 'https://my.click.uz/services/pay?...' }
  }
}

export const clickService = new ClickService()