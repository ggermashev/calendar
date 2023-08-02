import styled from "styled-components";

const Wrap = styled.div`
  position: relative;
  max-width: 740px;
  width: 100vw;
`

const Header = styled.div`
  padding: 0 2em;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 4em;
  box-sizing: border-box;

  .addIcon {
    color: red;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    border-radius: 100%;
    
    @media (hover: hover) {
      &:hover {
        cursor: pointer;
        outline: .5em solid rgba(255, 0, 0, 0.3);
        border-radius: 100%;
      }
    }

    &:active {
      background-color: rgba(255, 0, 0, 0.3);
      outline: none;
    }
  }
`

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 6em;
  position: relative;
  box-sizing: border-box;
  padding: .5em 0 .5em calc(100% / 8);
  background-color: rgba(0,0,0,0.05);
`

const Days = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  position: relative;
  
`

const Nav = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-weight: 500;
  font-size: .9em;
  position: relative;
  //left: .5em;


  .arrow {
    color: red;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    position: relative;
    border-radius: 100%;
    
    @media (hover: hover) {
      &:hover {
        cursor: pointer;
        outline: .1em solid rgba(255, 0, 0, 0.3);
        border-radius: 100%;
      }
    }
    
    &:active {
      background-color: rgba(255, 0, 0, 0.3);
      outline: none;
    }
  }
  
`

const Content = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: calc(100vh - 13em);
`

const Times = styled.div`
  width: calc(100% / 8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  
  p {
    font-size: .8em;
    opacity: 0.5;
  }
`

const Cells = styled.div`
  width: calc(100% - 100% / 8);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex-grow: 1;
  position: relative;
  box-sizing: border-box;
`

const Footer = styled.div`
  padding: 0 2em;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 3em;
  box-sizing: border-box;
  background-color: rgba(0,0,0,0.05);
`

export {
    Wrap,
    Header,
    Cells,
    Nav,
    Times,
    Content,
    Days,
    Footer,
    Menu,
}