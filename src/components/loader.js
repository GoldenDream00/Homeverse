import styled from 'styled-components'
import { ScaleLoader } from 'react-spinners';


export default function Loader () {
    return(
        <Wrapper>
            <ScaleLoader color="#ffffff" size={80} />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    position:fixed;
    top:0px;
    left:0px;
    right:0px;
    bottom:0px;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    z-index:6000  !important;
    background-color:#141517;
`