import styled from 'styled-components';

export const Wrapper = styled.div`
    background-color:#141517;
    min-height:810px;
    color:white;
    display:flex;
    flex-direction:row;
    padding: 50px 20px;
    justify-content:center;
    .choose-plan{
        text-align:center;
    }
    .plan-list{
        justify-content:center;
        padding:50px 0px;
        overflow: auto;
    }
    .faq{
        justify-content:center;
    }
`
export const Heading = styled.h1`
    font-family:Montserrat;
`
export const Heading3 = styled.h3`
    font-family:Montserrat;
`

export const PlanList = styled.ul`
    list-style:none;
    display:flex;
    flex-direction:row;
    align-items:center;
    gap:50px;
    padding:0px;
    width:100%;
    max-width:1450px;
    li{
        width:100%;
    }
`
export const CardWrapper = styled.div`
    background-color:rgba(0,0,0,.3);
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    padding:30px 20px;
    border-radius:15px;
    width: 210px;
    .btn-upgrade-plan{
        background-color:#141517;
        &:hover{
        background-color: #323232;
    }
    }
`
export const PlanWrapper = styled.div`
    width:100px;
    height:100px;
    border-radius:100%;
    background-color:${props => props.bg};
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:center;
`
export const TextWrapper = styled.div`
    max-width:1450px;
    width:100%;
`
export const Text = styled.p`
    font-family:Poppins;
    font-size:14px;
    line-height: 32px;
`
export const FaqList = styled.ul`
    padding:0px;
    padding-top:10px;
    gap:20px;
    display:flex;
    flex-direction:column;
    list-style:none;
`