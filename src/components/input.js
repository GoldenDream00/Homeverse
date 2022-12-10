import styled from 'styled-components';

export default function Input ({ type = "text", label = "", style, onChange, id, name,onKeyUp,value, accept, className, placeholder }) {
    return(
        <Content style={style} >
        <Label>{label}</Label>
        <Wrapper placeholder={placeholder} accept={accept} type={type} onChange={onChange} id={id} value={value} name={name} onKeyUp={onKeyUp} className={className} />
        </Content>
    )
}

const Wrapper = styled.input`
    height:40px;
    outline:none;
    font-size:16px;
    border-radius:10px;
    border:none;
    background-color:#141517;
    width:100%;
    color:white;
    font-family:Montserrat;
    text-indent:15px;
    margin-top:10px;
    ${props => props.style}
`
const Label = styled.label`
    color:white;
    font-family:Montserrat;
    font-weight:bold;
    text-transform:uppercase;
    margin-left:10px;
`

const Content = styled.div`
    ${props => props.style}
`