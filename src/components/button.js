import styled from 'styled-components';
import { CircleLoader } from 'react-spinners';
import { Row } from './layout';

export default function Button ({text, onClick, flag = null, loading = false, className}) {
    return(
        <Wrapper onClick={onClick} disabled={flag} className={className}>
            <Row className='btn-wrapper'>
                {
                    loading ?  <CircleLoader size={15} color="#ffffff" /> : null

                }
            {
                text
            }
            </Row>
        </Wrapper>
    )
}

const Wrapper = styled.button`
    height:50px;
    max-width:200px;
    padding:0px 30px;
    width:100%;
    border-radius:99999px;
    border:2px solid white;
    background:none;
    color:white;
    font-family:Montserrat;
    font-weight:bold;
    cursor:pointer;
    .btn-wrapper{
        gap:10px;
        justify-content:center;
        align-items:center;
    }
`