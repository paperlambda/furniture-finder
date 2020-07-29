import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

const Main = ({ children }) => (
  <div
    css={css`
      max-width: 480px;
      overflow-x: hidden;
      margin: 56px auto;
    `}
  >
    {children}
  </div>
)

Main.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default Main
