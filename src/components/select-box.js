import { useState } from 'react';
import styled from 'styled-components';
import { Capitalize } from 'utilities';


export default function SelectBox({ label = "", data = null, onChange, id="", defaultValue="none", typeText, className }) {

    return (
        <div>
            <Label>{label}</Label>
            <Wrapper onChange={onChange} id={id} defaultValue={defaultValue} className={className}>
                <Option value="none" disabled hidden>
                    {
                        typeText
                    }
                </Option>
                {
                        data.map((item, key) => {
                            return (
                                <Option key={key} id={item.id} value={item.name}>
                                    {
                                        Capitalize(item.name)
                                    }
                                </Option>
                            )
                        })
                }
            </Wrapper>
        </div>
    )
}

const Wrapper = styled.select`
    width:100%;
    height:40px;
    background-color:#141517;
    border:none;
    outline:none;
    color:white;
    font-family:Montserrat;
    padding-left:20px;
    margin-top:10px;
    border-radius:10px;
    border-right:16px solid transparent;
`
const Label = styled.label`
    color:white;
    font-family:Montserrat;
    font-weight:bold;
    text-transform:uppercase;
`
const Option = styled.option`
    color:white;
`