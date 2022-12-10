import styled from 'styled-components';

export default function Overlay ({opacity=0.65}) {
    return(
        <OverlayContent opc={opacity} />
    )
}

const OverlayContent = styled.div`
    position:absolute;
    z-index:1;
    background-color:rgba(0,0,0,${props => props.opc});
    top:0px;
    left:0px;
    right:0px;
    bottom:0px;
`