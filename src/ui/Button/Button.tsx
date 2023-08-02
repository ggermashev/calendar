import styled, { css } from 'styled-components'

interface IButton {
    $clear?: boolean
    $hidden?: boolean
}

const Button = styled.button<IButton>`
  padding: 1em;
  border-radius: 1em;
  border: 1px solid red;
  background-color: white;
  -webkit-tap-highlight-color: transparent;
  &:hover {
    outline: 2px rgba(255,0,0,0.3);
    cursor: pointer;
  }
  
  ${props => props.$hidden && css`
    visibility: hidden;
  `}
  
  ${props => props.$clear && css`
    border: none;
    color: red;
    background-color: rgba(0,0,0,0);
    
    &:hover {
      cursor: pointer;
    }
    
    &:active {
      background-color: rgba(255,0,0,0.3);
    }
  `}
`

export default Button