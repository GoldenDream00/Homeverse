import styled from 'styled-components';

export const Wrapper = styled.div`
    position: relative;
    z-index: 0;
`

export const Button = styled.button`
    width:100%;
    background-color:#555252;
    border:none;
    color:white;
    font-family:Montserrat;
    border-radius:10px;
    padding: 15px;
    font-weight: 600;
    cursor:pointer;
    position: relative;
    z-index: 0;
    max-width:120px;
    &:hover{
        background-color: #404040;
    }
`
export const TextWrapper = styled.div`
    max-width: 350px;
`