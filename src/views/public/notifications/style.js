import styled from 'styled-components';

export const Wrapper = styled.div`
    background-color:#141517;
    min-height:810px;
    display:flex;
    flex-direction:row;
    justify-content:center;
    padding-left: 20px;
    padding-right: 20px;
    .container{
        display:flex;
        flex-direction:column;
        align-items:center;
        padding-top: 50px;
    }
`
export const TableWrapper = styled.div`
    max-width: 1640px;
    width: 100%;
    overflow: auto;
    color: white;
    font-family: Montserrat;
`