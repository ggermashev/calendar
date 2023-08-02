import styled, {css} from "styled-components";

interface IButton {
    $left?: boolean,
    $right?: boolean
}

const Header = styled.div`
  padding-top: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: .25em;
`

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  width: 100%;
`

const Button = styled.div<IButton>`
  width: 50%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1em 0;
  color: royalblue;
  border-top: 1px solid black;
  
  @media (hover: hover) {
    &:hover {
      cursor: pointer;
      color: red;
    }
  }
  
  ${prop => prop.$left && css`
    border-radius: 0 0 0 1em;
    border-right: 1px solid black;
  `}

  ${prop => prop.$right && css`
    border-radius: 0 0 1em 0;
  `}
`

const Input = styled.input`
    width: 80%;
    height: 2em;
`

export {
    Button,
    Buttons,
    Header,
    Input
}