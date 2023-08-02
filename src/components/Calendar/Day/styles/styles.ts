import styled, {css} from "styled-components";

interface IDay {
    $current?: boolean
}

const Wrap = styled.div<IDay>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  font-size: 0.8em;
  font-weight: bolder;
  width: calc(100% / 7);
  box-sizing: border-box;
  gap: .5em;
  position: relative;
`

const WeekDay = styled.p`
  font-size: .7em;
  font-weight: 500;
`

const Number = styled.div<IDay>`
  width: 2em;
  aspect-ratio: 1;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;

  ${props => props.$current && css`
    background-color: red;
    color: white;
  `}
`

export {Wrap, Number, WeekDay}