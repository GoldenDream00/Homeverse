import styled from "styled-components";
import { FiStar } from 'react-icons/fi';
import { SharedImage } from "constants/image-constant";
import { Row } from "./layout";
import { LazyLoadImage } from 'react-lazy-load-image-component';

const { UserAvatar, NEWS, BUSINESS, MOVIE, Free, FUN, TECH } = SharedImage;

const KeywordImage = ({ name }) => {
    switch (name) {
        case "business":
            return <LazyLoadImage src={BUSINESS} className="keyword-img" alt="avatar" />
        case "movie":
            return <LazyLoadImage src={MOVIE} className="keyword-img" alt="avatar" />
        case "news":
            return <LazyLoadImage src={NEWS} className="keyword-img" alt="avatar" />
        case "free":
            return <LazyLoadImage src={Free} className="keyword-img" alt="avatar" />
        case "tech":
            return <LazyLoadImage src={TECH} className="keyword-img" alt="avatar" />
        case "fun":
            return <LazyLoadImage src={FUN} className="keyword-img" alt="avatar" />
        default:
            return <LazyLoadImage src={UserAvatar} className="keyword-img" alt="avatar" />
    }
}

export default function VideoCard({ onClick, item }) {

    return (
        <Card onClick={onClick}>
            <Row className='video-info-wrapper'>
                <KeywordImage name={item.data.type} />
            </Row>
            <Text>{item.data.title}</Text>
            <LazyLoadImage
                alt="homeverseio"
                height={250}
                src={item.data.posterImage} // use normal <img> attributes as props
                width={250} />
            <Row className='rate-wrapper'>
                <FiStar className='rate' />
                <Heading>{item.data.follers.length}</Heading>
            </Row>
        </Card>
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