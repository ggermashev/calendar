import styled, {css} from "styled-components";

interface ICell {
    $left?: boolean,
    $right?: boolean,
    $top?: boolean,
    $bottom?: boolean,
    $hasTask?: boolean,
    $isActive?: boolean,
}

const Wrap = styled.div<ICell>`
  width: calc(100% / 7);
  height: calc(100% / 12);
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  top: -.5em;

  ${props => props.$top && css`
    height: calc(100% / 12 / 2);
  `}

  ${props => props.$bottom && css`
    height: calc(100% / 12 / 2);
  `}

  ${props => props.$left && css`
    border-left: none;
  `}

  ${props => props.$right && css`
    border-right: none;
  `}

  ${props => props.$hasTask && css`
    background-color: mediumslateblue;
    opacity: 0.2;
    
    &:hover {
      cursor: pointer;
    }
  `}

  ${props => props.$isActive && css`
    background-color: mediumslateblue;
    opacity: 0.8;
  `}

`

export {Wrap}