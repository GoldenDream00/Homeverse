import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { PUBLIC_PREFIX, COMING_SOON_PREFIX } from 'configs/app-config';

const shopText = "If you want NFTS and other things, you can purchase it in our Shop. NFTs also provide special func.It'll be comming soon"


export default function BannerCard () {

    const history = useHistory();

    return(
        <Wrapper>
            <Heading>Purchase Cool Banner</Heading>
            <Text>
                You can purchase Banners and change your banner image
            </Text>
            <BrowseButton onClick={() => history.push({
                pathname:PUBLIC_PREFIX + COMING_SOON_PREFIX,
                state:{
                    data:shopText
                }
            })} >
                Purchase now
            </BrowseButton>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    color: white;
    background-color: rgba(0,0,0,.3);
    padding: 20px;
    border-radius: 10px;
    font-family: Montserrat;
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