import styled from 'styled-components';

export const Wrapper = styled.div`
    position:fixed;
    top:0px;
    left:0px;
    right:0px;
    bottom:0px;
    background-color:#141517;
    z-index:8;
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:center;
    .container{
        display:flex;
        flex-direction:row;
        align-items:center;
       justify-content:center;
       padding: 20px;
       .contain-row{
           gap:50px;
           align-items: center;
           @media screen and (max-width:1030px) {
                flex-direction: column;
           }
       }
    }
`
export const TextWrapper = styled.div`
    .heading-2{
        font-size:36px;
        color:white;
        padding-top:30px;
        @media screen and (max-width:420px) {
            font-size: 30px;
        }
    }
    @media screen and (max-width:1030px) {
        text-align: center;
    }
`

export const Heading = styled.h1`
    font-size:112px;
    color:#E1BEE7;
    font-family:Montserrat;
    margin:0px;
    @media screen and (max-width:1030px) {
        text-align: center;
    }
    @media screen and (max-width:420px) {
        font-size: 80px;
    }
`
export const Text = styled.p`
    color:white;
    font-size:24px;
    max-width:550px;
    padding-bottom:50px;
    @media screen and (max-width:1030px) {
        text-align: center;
    }
    @media screen and (max-width:420px) {
        font-size: 18px;
    }
`