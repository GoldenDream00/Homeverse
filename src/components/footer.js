import styled from 'styled-components';
import { Container } from './layout';
import { SiDiscord, SiTwitter, SiInstagram } from 'react-icons/si';

export default function Footer() {
    return (
        <Wrapper>
            <Container>
                <SocialMenu>
                    <li>
                        <a href='https://discord.gg/5ru4Ck6F' target='_blank'>
                            <SiDiscord />
                        </a>
                    </li>
                    <li>
                        <SiTwitter />
                    </li>
                    <li>
                        <a href='https://instagram.com/homeverse.io?r=nametag' target='_blank'>
                            <SiInstagram />
                        </a>
                    </li>
                </SocialMenu>
            </Container>
        </Wrapper>
    )
}

const Wrapper = styled.footer`
    background-color:#141517;
    color:white;
    display:flex;
    flex-direction:row;
    flex-flow:wrap;
    justify-content:center;
    padding: 20px;
`

const SocialMenu = styled.ul`
    padding:0px;
    margin:0px;
    display:flex;
    flex-direction:row;
    flex-flow:wrap;
    list-style:none;
    justify-content:center;
    gap:50px;
    font-size:24px;
    li{
        cursor: pointer;
        a{
            color: white;
        }
    }
`