import React from 'react'
import { css } from '@emotion/core'

const Navbar = () => (
  <div
    className="fixed w-screen flex content-center justify-center bg-gray-200"
    css={css`
      height: 56px;
      top: 0px;
      z-index: 99;
    `}
  >
    <h3 className="flex items-center text-xl">Furniture Finder</h3>
  </div>
)

export default Navbar
