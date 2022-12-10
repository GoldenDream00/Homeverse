import styled from 'styled-components';

export default function CheckBox({ text, onChange }) {
    return (
        <Wrapper>
            <div>
                {text}
            </div>
            <input type="checkbox" onChange={onChange} />
            <CheckMark className='checkmark' />
        </Wrapper>
    )
}

const Wrapper = styled.label`
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    display:flex;
    flex-direction:row;
    align-items:center;
    font-size: 16px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    color: white;
    font-family:Montserrat;
    input{
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }
    input:checked ~ .checkmark {
        background-color: #141517;
    }
    input:checked ~ .checkmark:after {
        display: block;
    }

`
const CheckMark = styled.span`
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
    border-radius:5px;
    background-color: #141517;
    &:after {
        content: "";
        position: absolute;
        display: none;
      }
      &:after {
        left: 7px;
        top: 3px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 2px 2px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
      }
`