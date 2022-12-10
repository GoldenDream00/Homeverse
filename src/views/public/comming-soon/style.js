import styled, { keyframes } from 'styled-components';

export const BrowseMoreButton = styled.div`
    color: white;
    font-family: Montserrat;
    background-color: #404040;
    padding: 20px;
    width: 100%;
    max-width: 200px;
    text-align: center;
    cursor: pointer;
    font-weight: 600;
    border-radius: 50px;
    &:hover{
        background-color: #5C5C5C;
    }
`
export const BubbleAnimation = keyframes`
    0%{
        transform:translateY(0px);
    }
    50%{
        transform:translateY(-30px);
    }
    100%{
        transform:translateY(0px);
    }
`
export const BubbleAnimation2 = keyframes`
    0%{
        transform:translateY(0px);
    }
    50%{
        transform:translateY(30px);
    }
    100%{
        transform:translateY(0px);
    }
`


export const Wrapper = styled.div`
    background-color:#141517;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    position:fixed;
    z-index:8;
    top:0px;
    left:0px;
    right:0px;
    bottom:0px;
    padding: 0px 20px;

    .browse-more{
        max-width:230px;
    }
    .bubble{
        position:absolute;
        left:80px;
        top:0px;
        animation:${BubbleAnimation} 8s linear infinite;
        
    }
    .bubble-2{
        position:absolute;
        right:240px;
        bottom:-100px;
        animation:${BubbleAnimation} 8s linear infinite;
    }
    .bubble-3{
        max-width:80px;
        position:absolute;
        left:20px;
        bottom:45%;
        animation:${BubbleAnimation} 8s linear infinite;

    }
    .bubble-4{
        max-width:80px;
        position:absolute;
        right:220px;
        top:25%;
        animation:${BubbleAnimation2} 8s linear infinite;
    }
`
export const Heading = styled.h1`
    font-family:Montserrat;
    color:white;
    font-size:72px;
    text-align:center;
    @media screen and (max-width:630px) {
        font-size: 45px;
    }
`
export const TextWrapper = styled.div`
    color:white;
    font-family:Montserrat;
    font-size:20px;
    max-width:700px;
    text-align:center;
    line-height:35px;
    padding-bottom:50px;
    @media screen and (max-width:630px) {
        font-size: 16px;
    }
`