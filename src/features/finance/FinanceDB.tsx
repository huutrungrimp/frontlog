import React from 'react'
import Income from './dashboard/Income'

export default function FinanceDB() {
  return (
    <div className='financeDB'>
      <div className='income'>
        <h4>Income</h4>
        <div id='incomeGraph'>
          <Income />
        </div>
      </div>
    </div>
  )
}
