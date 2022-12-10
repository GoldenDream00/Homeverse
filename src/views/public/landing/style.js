import styled from 'styled-components';

export const Wrapper = styled.section`
    min-height:82.5vh;
    background-image:url(${props => props.landing});
    background-size:cover;
    background-position:center;
    color:white;
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:center;
    padding: 0px 20px;
    .content-row{
        align-items:center;
        justify-content:space-between;
        gap: 30px;
        flex-wrap: nowrap;
        position: relative;
        z-index: 2;
        @media screen and (max-width:980px) {
            flex-direction: column;
            align-items: center;
            padding: 30px 20px;
        }
    }
`
export const Heading = styled.h1`
    padding:0px;
    margin:0px;
    font-size:85px;
    font-family:Montserrat;
    @media screen and (max-width:1200px) {
        font-size:70px;
    }
    @media screen and (max-width:1060px) {
        font-size:60px;
    }
    @media screen and (max-width:620px) {
        font-size:50px;
    }
    @media screen and (max-width:460px) {
        font-size:40px;
    }
    @media screen and (max-width:360px) {
        font-size:30px;
    }
`

export const Text = styled.p`
    font-family:Montserrat;
    font-size:18px;
    padding-bottom:32px;
    line-height:32px;
    @media screen and (max-width:460px) {
        font-size: 14px;
        line-height: 28px;
    }
`

export const TextWrapper = styled.div`
    flex: 1;
    max-width: 600px;
    a{
        border: 2px solid white;
        text-decoration: none;
        padding: 15px;
        color:white;
        border-radius: 100px;
        font-family:Montserrat;
        font-weight:600;
    }
    @media screen and (max-width:980px) {
        order: 2;
        text-align: center;
    }
`
export const ImageWrapper = styled.div`
    @media screen and (max-width:980px) {
        order: 1;
        max-width: 600px;
    }
`