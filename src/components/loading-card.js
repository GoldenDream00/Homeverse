import styled from "styled-components";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { Row } from "./layout";

const AvatarStyle = {
    width: "30px",
    height: "30px",
    borderRadius: "50%"
}

const HeadingStyle = {
    marginBottom: "38px",
    marginTop: "16px"
}

const ToolBarStyle = {
    margin: "26px 0px"
}

export default function LoadingCard () {
    return (
        <>
            <Card>
                <SkeletonTheme baseColor="#202020" highlightColor="#444">
                    <Row className='video-info-wrapper'>
                        <Skeleton style={AvatarStyle} />
                    </Row>
                    <Skeleton style={HeadingStyle} />
                    <Skeleton style={{
                            width: "250px",
                            height: "250px"
                        }} />
                    <Skeleton style={ToolBarStyle} />
                </SkeletonTheme>
            </Card>
        </>
    )
}

const Card = styled.div`
    background-color:rgba(0,0,0,.3);
    padding:20px;
    border-radius:20px;
    max-width:250px;
    width:100%;
    height:auto;
    cursor:pointer;
    .video-info-wrapper{
        align-items: center;
        gap: 10px;
        .keyword-img{
            max-width:30px;
        }
        .medal-img{
            max-width: 30px;
        }
    }
    .rate-wrapper{
        align-items:center;
        gap:15px;
    }
    .rate{
        color:#F5A623;
    }
    img{
        border-radius:18px;
        max-width:100%;
        height:auto;
    }

`
const Heading = styled.h1`
    font-family:Montserrat;
    font-size:20px;
`
const Text = styled.p`
    color:white;
    font-family:Poppins;
    overflow: hidden;
    text-overflow: ellipsis; 
    text-align:left;
    height:55px;
`