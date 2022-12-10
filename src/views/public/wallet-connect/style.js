import styled from 'styled-components';

export const Wrapper = styled.section`
    background-color:#141517;
    color:white;
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:center;
    min-height:810px;
    .wallet-connect-container{
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
`

export const WalletList = styled.ul`
    padding:0px;
    margin:0px;
    list-style:none;
    display:flex;
    flex-direction:row;
    flex-flow:wrap;
    gap:30px;
    max-width:1250px;
    @media screen and (max-width:1300px) {
        max-width:930px;
    }
    @media screen and (max-width:975px) {
        max-width:615px;
    }
    @media screen and (max-width:660px) {
        max-width:300px;
    }
`
export const Card = styled.div`
    background-color:rgba(0,0,0,.15);
    border-radius:20px;
    padding:20px;
    flex:1;
    max-width:250px;
    cursor:pointer;
`
export const Heading = styled.h1`
    font-family:Montserrat;
    font-size:20px;
`
export const Text = styled.p`
    color:#68676E;
`