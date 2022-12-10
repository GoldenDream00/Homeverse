import styled from "styled-components";

export const Table = styled.table`
    border-collapse: separate;
    width: 100%;
    text-align: left;
    font-family: Poppins;
    border-spacing: 0px 20px;
    color: white;
`

export const Tr = styled.tr`
    margin: 10px;
    &:first-child{
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
    }
    &:last-child{
        border-bottom-right-radius: 20px;
        border-top-right-radius: 20px;
    }
`

export const Th = styled.th`
    padding: 20px;
    padding-top: 0px;
`

export const Td = styled.td`
    background-color: rgba(0,0,0, .3);
    padding: 20px;
    &:first-child{
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
    }
    &:last-child{
        border-bottom-right-radius: 20px;
        border-top-right-radius: 20px;
    }
`