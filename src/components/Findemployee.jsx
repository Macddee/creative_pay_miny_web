import React, { useState } from 'react'
import { RiSearchEyeLine } from "react-icons/ri";
import SearchPopup from './SearchPopup';
import { DiVim } from 'react-icons/di';

export default function Findemployee() {
  const [showPp, setShowPp] = useState(false)

  return (
    <>
      <button type='button' onClick={() => { setShowPp(true) }} className=" text-red-500 text-2xl">
        <RiSearchEyeLine />
      </button>
      {showPp &&  <SearchPopup />}
    </>
  )
}
