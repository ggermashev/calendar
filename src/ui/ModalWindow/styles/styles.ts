import styled, {css} from "styled-components";

interface IWrap {
    $hidden?: boolean
}

const Wrap = styled.div<IWrap>`
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  
  ${prop => prop.$hidden && css`
    display: none;
  `}
`

const Window = styled.div`
  width: 80vw;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  gap: 1em;
  border-radius: 1em;
  background-color: lightgrey;
  position: relative;
`

export {Wrap, Window}