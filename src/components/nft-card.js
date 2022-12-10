import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { PUBLIC_PREFIX, COMING_SOON_PREFIX } from 'configs/app-config';
import { SharedImage } from 'constants/image-constant';
import Image from './image-wrapper';

const shopText = "If you want NFTS and other things, you can purchase it in our Shop. NFTs also provide special func.It'll be comming soon"

const { NFTList } = SharedImage;

export default function NFTCard () {

    const history = useHistory();

    return(
        <Wrapper>
            <Heading>Purchase Cool NFT</Heading>
            <Text>
            NFT provides various functions
            Access rights for some types of videos, use of Avatar, etc.
            Please purchase Cool NFTs
            </Text>
            <BrowseButton onClick={() => history.push({
                pathname:PUBLIC_PREFIX + COMING_SOON_PREFIX,
                state:{
                    data:shopText
                }
            })} >
                Purchase Now
            </BrowseButton>
            <ImageWrapper>
                    <Image src={NFTList} />
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