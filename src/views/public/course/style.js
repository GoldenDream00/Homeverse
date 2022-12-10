import styled from 'styled-components';

export const Wrapper = styled.section`
    min-height:71.9vh;
    position:relative;
    background-color:#141517;
    color:white;
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:center;
    padding: 50px 20px;
    .container{
        display:flex;
        flex-direction:row;
        justify-content:center;
        align-items:center;
        gap:50px;
        position: relative;
        z-index: 2;
        @media screen and (max-width:870px) {
            flex-direction: column;
            align-items: center;
        }
    }
    .tool-bar{
        gap:20px;
        min-width: 450px;
        button{
            max-width: 180px;
        }
        @media screen and (max-width:1490px) {
            min-width: 100%;
        }
    }
`
export const Heading = styled.h1`
    font-size:36px;
    font-family:Montserrat;
    padding: 0px;
    margin: 0px;
    @media screen and (max-width:500px) {
        font-size:36px;
    }
    @media screen and (max-width:400px) {
        font-size:26px;
    }
`
export const Text = styled.p`
    font-family:Poppins;
    font-size:14px;
    padding-bottom:30px;
    line-height: 30px;
    max-height: 350px;
    overflow: auto;
    color: #CACACA;

    &::-webkit-scrollbar {
            width: 5px;
        }

        &::-webkit-scrollbar-button{
            height: 15px;
        }

        &::-webkit-scrollbar-track {
        background: rgba(0,0,0,0); 
        border-radius: 50px;
        }
        
        &::-webkit-scrollbar-thumb {
        border-radius: 50px;
        background: rgba(0,0,0,.3); 
        }

        &::-webkit-scrollbar-thumb:hover {
        background: #555; 
        }
`
export const TextWrapper = styled.div`
    max-width:630px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .keyword-wrapper{
        padding-bottom: 50px;
        gap: 10px;
    }
    @media screen and (max-width:1490px) {
        order:2;   
    }
`
export const ImageWrapper = styled.div`
    max-width:600px;   
    img{
        border-radius:20px;
    }
    @media screen and (max-width:1490px) {
        order:1;
    }
`
export const KeywordWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-family: Montserrat;
    gap: 10px;
    .keyword{
        color: #F5A623;
    }
    font-weight: 600;
    background-color: rgba(0,0,0,.3);
    padding: 5px 10px;
    border-radius: 5px;
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.25);
`