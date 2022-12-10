import Image from 'components/image-wrapper';
import { Container, Row } from 'components/layout';
import { connect } from 'react-redux';
import { SharedImage } from 'constants/image-constant';
import StarRate from 'components/star-rate';
import { Link } from 'react-router-dom';
import { PUBLIC_PREFIX, UPLOAD_PREFIX, UPGRADE_PREFIX, COURSE_PREFIX, MOVIE_LIST_PREFIX } from 'configs/app-config';
import { useEffect, useState } from 'react';
import Overlay from 'components/overlay';
import Offlaner from 'components/offlaner';
import { notifyError, removeScrollBar, showScrollBar, truncateTwoDecimal } from 'utilities';
import Loader from 'components/loader';
import { useHistory } from 'react-router-dom';
import VideoCard from 'components/video-card';
import MyListCard from 'components/my-list-card';
import NFTCard from 'components/nft-card';
import BannerCard from 'components/banner-card';
import PurchasedCard from 'components/purchased-card';
import { getUserByAddress, getVideoByAddress } from 'actions/video-data';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingList from 'components/loading-list';
import { CourseList, TypeMenu, TypeWrapper, ContentWrapper, MetaWrapper, BannerSection, Wrapper, Heading } from './style';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const { Avatar, Landing, HVTJunior, HVTExpert, HVTMaster, HVTProfessional, HVTSpecial, GoldMedal, SilverMedal, LegendMedal } = SharedImage;

function MyListPage(props) {

    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [videoList, setVideoList] = useState([]);
    const [countIndex, setCountIndex] = useState(0);
    const [readAll, setReadAll] = useState(true);
    const [lastseen, setLastSeen] = useState(1);
    const [userInfo, setUserInfo] = useState({
        plan: 0,
        rate: 0,
        count: 0,
        purchased_list: []
    })

    const [checkUser, setCheckUser] = useState(true);

    useEffect(async () => {
        removeScrollBar();
        setLoading(true);
        setReadAll(true);
        setCountIndex(0);
        const url = window.location.href;
        const userWallet = url.split("/").pop();

        const objs = document.getElementsByClassName("list-type-item");
        var arr = [...objs];

        arr.map((item) => {
            item.classList.remove("active-type")
        })

        const obj = document.querySelector(".my-list");
        obj.classList.add("active-type");

        if (props.wallet_address === userWallet) {
            setCheckUser(true);

            if (props.timer) {
                clearInterval(props.timer);
            }

            const { videos } = await getVideoByAddress(props.wallet_address, 1);
            if (videos.length !== 0) {
                setLastSeen(videos[videos.length - 1].data.count + 1);
            }

            if (videos.length < 8) {
                setReadAll(false);
            }
            setUserInfo({ ...userInfo, plan: props.plan, rate: props.rate, purchased_list: props.purchased_list, count: props.count })
            setVideoList([...videos]);
        } else {
            const { user } = await getUserByAddress(userWallet);
            setCheckUser(false);
            if (user.user) {
                const { videos } = await getVideoByAddress(userWallet, 1);
                if (videos.length !== 0) {
                    setLastSeen(videos[videos.length - 1].data.count + 1);
                }

                if (videos.length < 8) {
                    setReadAll(false);
                }
                setUserInfo({ ...userInfo, plan: user.user.plan, rate: user.user.rate, purchased_list: user.user.purchased_videos, count: user.user.video_count })
                setVideoList([...videos]);
            } else {
                history.push(PUBLIC_PREFIX + `/404`)
            }
        }
        setLoading(false);
        showScrollBar();

    }, [props.wallet_address])

    const goDetailPage = (item) => {
        history.push({
            pathname: PUBLIC_PREFIX + MOVIE_LIST_PREFIX + `/${item.id}`,
            state: {
                item: item
            }
        })
    }

    const changeActive = (e, count) => {
        const objs = document.getElementsByClassName("list-type-item");
        var arr = [...objs];
        arr.map((item) => {
            item.classList.remove("active-type")
        })
        setActive(e.target, count);
    }

    const setActive = (obj, count) => {
        obj.classList.add("active-type")
        setCountIndex(count);
    }

    const searchMoreFunc = async () => {
        const url = window.location.href;
        const userWallet = url.split("/").pop();
        const { videos } = await getVideoByAddress(userWallet, lastseen);

        if (videos.length < 8 || videos.length === 0) {
            setReadAll(false)
        }
        if (videos.length !== 0) {
            setLastSeen(videos[videos.length - 1].data.count + 1);
            setVideoList([...videoList.concat(videos)]);
        }
    }

    return (
        <Wrapper>
            <Offlaner />
            <BannerSection bg={Landing}>
                <Overlay opacity={0} />
            </BannerSection>
            {
                loading ? <Loader /> : null
            }
            <Container className='container'>
                <Row className='profile-wrapper'>
                    <Image src={Avatar} className="avatar" alt="avatar" />
                    <MetaWrapper>
                        <Row className='rate-row'>
                            <StarRate value={props.rate} />
                            {
                                truncateTwoDecimal(props.rate)
                            }
                        </Row>
                        {
                            checkUser ? <Row className='profile-button-wrapper'>
                                <Link className='link' to={PUBLIC_PREFIX + UPGRADE_PREFIX}>
                                    Upgrade HVT
                                </Link>
                                <Link className='link' to={PUBLIC_PREFIX + UPLOAD_PREFIX}>
                                    Upload Video
                                </Link>
                            </Row> : null
                        }
                        <Row className='info-wrapper'>
                            <span>Total HVT</span>
                            <span>{userInfo.plan === 444 ? "TOP" : userInfo.plan}</span>
                        </Row>
                        <Row className='info-wrapper'>
                            <span>Used HVT</span>
                            <span>{userInfo.count}</span>
                        </Row>
                        <Row className='badge-content'>
                            <Heading>HVT BADGE</Heading>
                            <Row className='badge-wrapper'>
                                {
                                    userInfo.plan >= 3 ? <LazyLoadImage src={HVTJunior} /> : null
                                }
                                {
                                    userInfo.plan >= 33 ? <LazyLoadImage src={HVTExpert} /> : null
                                }
                                {
                                    userInfo.plan >= 63 ? <LazyLoadImage src={HVTMaster} /> : null
                                }
                                {
                                    userInfo.plan >= 93 ? <LazyLoadImage src={HVTProfessional} /> : null
                                }
                                {
                                    userInfo.plan >= 200 || userInfo.plan === 444 ? <LazyLoadImage src={HVTSpecial} /> : null
                                }
                            </Row>
                        </Row>
                        {
                            userInfo.rate >= 1 ?
                                <Row className='badge-content'>
                                    <Heading>HVT MEDALS</Heading>
                                    <Row className='badge-wrapper'>
                                        {
                                            userInfo.rate >= 1 ? <LazyLoadImage src={SilverMedal} /> : null
                                        }
                                        {
                                            userInfo.rate >= 3 ? <LazyLoadImage src={GoldMedal} /> : null
                                        }
                                        {
                                            userInfo.rate >= 6 ? <LazyLoadImage src={LegendMedal} /> : null
                                        }
                                    </Row>
                                </Row> : null
                        }
                    </MetaWrapper>
                </Row>
                <ContentWrapper>
                    <div className='type-menu-wrapper'>
                        <TypeMenu>
                            <li>
                                <TypeWrapper className="list-type-item active-type my-list" onClick={(e) => changeActive(e, 0)}>
                                    {
                                        checkUser ? "My List" : "Video List"
                                    }
                                </TypeWrapper>
                            </li>
                            {
                                checkUser ?
                                    <>
                                        <li>
                                            <TypeWrapper className="list-type-item" onClick={(e) => changeActive(e, 1)}>
                                                Purchased List
                                            </TypeWrapper>
                                        </li>
                                        <li>
                                            <TypeWrapper className="list-type-item" onClick={(e) => changeActive(e, 2)}>
                                                NFTs
                                            </TypeWrapper>
                                        </li>
                                        <li>
                                            <TypeWrapper className="list-type-item" onClick={(e) => changeActive(e, 3)}>
                                                Banners
                                            </TypeWrapper>
                                        </li>
                                    </>
                                    : null
                            }

                        </TypeMenu>
                    </div>
                    {
                        countIndex === 0 ? (videoList.length !== 0 ?
                            <>
                                <MyListCard />
                                <CourseList>
                                    <InfiniteScroll
                                        dataLength={videoList.length}
                                        next={searchMoreFunc}
                                        hasMore={readAll}
                                        loader={<LoadingList size={4} />}
                                    >
                                        {
                                            videoList.map((item, key) => {
                                                return (
                                                    <li key={key}>
                                                        <VideoCard onClick={() => goDetailPage(item)} item={item} />
                                                    </li>
                                                )
                                            })
                                        }
                                    </InfiniteScroll>
                                </CourseList>
                            </> : <MyListCard />) : null
                    }
                    {
                        countIndex === 1 ? (userInfo.purchased_list.length !== 0 ?
                            <>
                                <PurchasedCard />
                                <CourseList>
                                    <InfiniteScroll
                                        dataLength={videoList.length}
                                        next={searchMoreFunc}
                                        hasMore={readAll}
                                        loader={<LoadingList size={4} />}
                                    >
                                        {
                                            userInfo.purchased_list.map((item, key) => {
                                                return (
                                                    <li key={key}>
                                                        <VideoCard onClick={() => goDetailPage(item)} item={item} />
                                                    </li>
                                                )
                                            })
                                        }
                                    </InfiniteScroll>
                                </CourseList>
                            </>
                            : <PurchasedCard />) : null
                    }
                    {
                        countIndex === 2 ? <NFTCard /> : null
                    }
                    {
                        countIndex === 3 ? <BannerCard /> : null
                    }
                </ContentWrapper>
            </Container>
        </Wrapper>
    )
}

const mapStateToProps = state => {
    return {
        wallet_address: state.walletState.wallet_address,
        uploaded_list: state.userState.uploaded_list,
        timer: state.dataState.timer,
        rate: state.userState.rate,
        plan: state.userState.plan,
        count: state.userState.count,
        purchased_list: state.userState.purchased_list

    }
}

export default connect(mapStateToProps)(MyListPage)
