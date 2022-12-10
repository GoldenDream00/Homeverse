import Loader from 'components/loader';
import Offlaner from 'components/offlaner';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SharedVideo } from 'constants/video-constant';
import { Row, Container } from 'components/layout';
import { Capitalize, getCurrentSeconds, removeScrollBar, start_and_end } from 'utilities';
import { connect } from 'react-redux';
import { notifyError, notifySuccess } from 'utilities';
import { getUserByAddress } from 'actions/video-data';
import { PUBLIC_PREFIX, MOVIE_LIST_PREFIX, MYLIST_PREFIX } from 'configs/app-config';
import { useHistory } from 'react-router-dom';
import { Wrapper, Heading, Text, KeywordWrapper, BlogList, ReviewWrapper } from './style';
import { HiOutlineThumbUp } from 'react-icons/hi';
import { BsEyeFill } from 'react-icons/bs';
import { SiEthereum } from 'react-icons/si';
import { MdFilterListAlt } from 'react-icons/md';
import TextArea from 'components/textarea';
import LoaderButton from 'components/loading-button';
import { addBlogData, getVideoBlogs } from 'actions/blog-data';
import Image from 'components/image-wrapper';
import { SharedImage } from 'constants/image-constant';

const { Avatar } = SharedImage;
const { BG } = SharedVideo;

const MoviePrice = ({ name }) => {
    switch (name) {
        case "business":
            return "0.2"
        case "tech":
            return "0.2"
        case "movie":
            return "0.1"
        case "fun":
            return "0.1"
        case "news":
            return "0.3"
        case "free":
            return "Free"
        default:
            return "Unknown"
    }
}

function ViewDetailPage(props) {

    const location = useLocation();
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [postLoading, setPostLoading] = useState(false);
    const [blogData, setBlogData] = useState([]);
    const [yourAnswer, setAnswer] = useState("");

    useEffect(async () => {
        if (location.state) {
            setLoading(true);
            const { user } = await getUserByAddress(props.wallet_address);
            const { results } = await getVideoBlogs(location.state.item.id);

            console.log(results);

            let tempFlag = false;
            if (user) {
                user.user.purchased_videos.forEach((item) => {
                    if (item.id === location.state.item.id) {
                        tempFlag = true;
                    }
                })
            }
            setLoading(false);
            setBlogData([...results]);
        } else {
            history.push(PUBLIC_PREFIX + MOVIE_LIST_PREFIX)
        }
    }, [])

    const toExplorePage = () => {
        removeScrollBar();
        history.push({
            pathname: PUBLIC_PREFIX + MOVIE_LIST_PREFIX
        })
    }

    const postAnswer = async () => {
        if ((location.state.item.data.flag || props.wallet_address === location.state.item.data.address ) || location.state.item.data.type === "free") {
            if (yourAnswer !== "") {
                setPostLoading(true);
                const { blogId } = await addBlogData(location.state.item.id, props.wallet_address, yourAnswer);
                if (blogId) {
                    notifySuccess("Posted new Answer");
                    setPostLoading(false);

                    const tempBlogData = {
                        id:blogId,
                        data:{
                            videoId:location.state.item.id,
                            address: props.wallet_address,
                            userAnswer: yourAnswer,
                            date:getCurrentSeconds()
                        }
                    }

                    const tempArray = [...blogData];

                    tempArray.push(tempBlogData);

                    setBlogData([...tempArray])

                } else {
                    notifyError("Error Ocurred");
                    setPostLoading(false);
                }
            } else {
                notifyError("Please enter your answer")
            }
        } else {
            notifyError("You have to purchase video to post answer")
        }
    }

    return (
        <>
            {
                location.state ? <Wrapper>
                    {
                        loading ? <Loader /> : null
                    }
                    <Offlaner />
                    <video autoPlay muted loop>
                        <source src={BG} />
                    </video>
                    <Container className='article-container'>
                        <Row className='main-article'>
                            <Heading>
                                {
                                    location.state.item.data.title
                                }
                            </Heading>
                            <Text>
                                {
                                    location.state.item.data.overview
                                }
                            </Text>
                        </Row>
                        <Row className='meta-info-wrapper'>
                            <Row className='keyword-wrapper'>
                                <KeywordWrapper>
                                    <HiOutlineThumbUp className='keyword' /> {location.state.item.data.follers.length}
                                </KeywordWrapper>
                                <KeywordWrapper>
                                    <BsEyeFill className='keyword' /> {location.state.item.data.views}
                                </KeywordWrapper>
                                <KeywordWrapper>
                                    <SiEthereum className='keyword' /> <MoviePrice name={location.state.item.data.type} />
                                </KeywordWrapper>
                                <KeywordWrapper>
                                    <MdFilterListAlt className='keyword' /> {Capitalize(location.state.item.data.type)}
                                </KeywordWrapper>
                            </Row>
                            <Link className='user-card-info-wrapper' to={ PUBLIC_PREFIX + MYLIST_PREFIX + `/${location.state.item.data.address}` }>
                                <Image src={Avatar} />
                                {
                                    start_and_end(location.state.item.data.address)
                                }
                            </Link>
                        </Row>
                        {
                            blogData.length !== 0 ?
                                <>
                                    <Heading className='reviews-heading'>Reviews</Heading>
                                    <BlogList className='blog-list'>
                                        {
                                            blogData.map((item, key) => {
                                                console.log(item)
                                                return (
                                                    <li key={key}>
                                                        <Row className='review-card'>
                                                           <ReviewWrapper>
                                                           {
                                                                item.data.userAnswer
                                                            }
                                                           </ReviewWrapper>
                                                            <Link className='user-card-info-wrapper' to={PUBLIC_PREFIX + MYLIST_PREFIX + `/${item.data.address}`}>
                                                                <Image src={Avatar} />
                                                                {
                                                                    start_and_end(item.data.address)
                                                                }
                                                            </Link>
                                                        </Row>
                                                    </li>
                                                )
                                            })
                                        }
                                    </BlogList>
                                </> : null
                        }
                        <Row className='reply-wrapper'>
                            <Heading className='your-answer'>
                                Your Answer
                            </Heading>
                            <TextArea onChange={(e) => setAnswer(e.target.value)} style={{
                                width: "100%"
                            }} bg='rgba(0,0,0,.3)' />
                        </Row>
                        <Row className='button-wrapper'>
                            <LoaderButton loading={postLoading} text="Post your Answer" onClick={() => postAnswer()} />
                            <LoaderButton text="To Explore Page" onClick={() => toExplorePage()} />
                        </Row>
                    </Container>
                </Wrapper> : null
            }
        </>
    )
}

const mapStateToProps = state => {
    return {
        user__state: state.userState.user__state,
        wallet_address: state.walletState.wallet_address
    }
}

export default connect(mapStateToProps)(ViewDetailPage)

