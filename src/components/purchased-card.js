import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { PUBLIC_PREFIX, MOVIE_LIST_PREFIX } from 'configs/app-config';
import { SharedImage } from 'constants/image-constant';
import Image from './image-wrapper';

const { PVImage } = SharedImage;

export default function PurchasedCard () {

    const history = useHistory();

    return(
        <Wrapper>
            <Heading>Go Live on Homeverseio</Heading>
            <Text>
                If you are looking for video for your business or study, you can find good video on Homeverseio
            </Text>
            <BrowseButton onClick={() => history.push({
                pathname:PUBLIC_PREFIX + MOVIE_LIST_PREFIX
            })} >
                Explore Now
            </BrowseButton>
            <ImageWrapper>
                    <Image src={PVImage} />
            </ImageWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    color: white;
    background-color: rgba(0,0,0,.3);
    padding: 20px;
    border-radius: 10px;
    font-family: Montserrat;
    position: relative;
    overflow: hidden;
    @media screen and (max-width:670px){
        display: none;
    }
`
const Heading = styled.h1`
    margin-top: 0px;
`
const Text = styled.div`
    max-width: 350px;
    line-height: 24px;
    padding-bottom: 50px;
`
const BrowseButton = styled.button`
    border: none;
    background-color: #141517;
    color: white;
    padding: 15px 20px;
    border-radius: 50px;
    font-family: Montserrat;
    font-weight: 600;
    cursor: pointer;
    &:hover{
        background-color: #323232;
    }
`
const ImageWrapper = styled.div`
    max-width: 600px;
    position: absolute;
    right: 0px;
    top: 0px;
    transform: rotateZ(-30deg) translateX(180px) translateY(-140px);
    transform: rotateZ(-30deg) translateX(180px) translateY(-140px);
    @media screen and (max-width:1720px) {
        max-width: 500px;
    }

    @media screen and (max-width:1020px){
        display: none;
    }
`