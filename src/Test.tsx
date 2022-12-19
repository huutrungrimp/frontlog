import React, { useContext } from 'react';
import { dataContext } from './features/assets/dataProvider';


export default function Test() {
    const value = useContext(dataContext)
    console.log(value)
  return (
    <div>Test</div>
  )
}
