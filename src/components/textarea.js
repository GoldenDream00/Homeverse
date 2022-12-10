import styled from 'styled-components';

export default function TextArea ({label = "", bg="#141517", style, onChange, name, value}) {
    return(
        <Content style={style}>
            <Label>{label}</Label>
            <Wrapper onChange={onChange} bg={bg} value={value} name={name} />
        </Content>
    )
}

const Wrapper = styled.textarea`
    height:430px;
    background-color:${props => props.bg};
    margin-top:10px;
    outline:none;
    color:white;
    font-family:Montserrat;
    padding-top:15px;
    border-radius:10px;
    border:none;
    resize:none;
    color: #CACACA;
    font-size:16px;
    padding-left:20px;
    line-height: 24px;
`

const Label = styled.label`
    color:white;
    font-family:Montserrat;
    font-weight:bold;
    text-transform:uppercase;
    margin-left:10px;
`
const Content = styled.div`
    display:flex;
    flex-direction:column;
`