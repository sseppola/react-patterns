import React from 'react'

import BtcProvider from './BtcProvider'
import BtcConsumer from './BtcConsumer'

export default function ProviderBtcIndex() {
  return (
    <BtcProvider>
      <BtcConsumer />
    </BtcProvider>
  )
}
