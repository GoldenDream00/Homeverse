import styled from 'styled-components';
import { CircleLoader } from 'react-spinners';


export default function LoaderButton({ onClick, text, loading, className, style, disable=false }) {
    return (
        <Wrapper loading={loading} onClick={onClick} disabled={disable} className={className} style={style}>
            {
                loading ? <CircleLoader size={15} color="#ffffff" /> : null
            }
            {
                text
            }
        </Wrapper>
    )
}

const Wrapper = styled.button`
    padding:15px;
    width:100%;
    background-color:rgba(0,0,0,.3);
    color:white;
    font-family: Montserrat;
    border:none;
    border-radius:10px;
    cursor:pointer;
    display:flex;
    flex-direction:row;
    gap:10px;
    justify-content:center;
    align-items: center;
    font-weight: 600;
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.25);
    ${props => props.loading ? null : `&:hover{
        background-color: #323232;
    }`}
`