import { Container, Row } from 'components/layout';
import { connect } from "react-redux";
import { useEffect } from 'react';
import Input from 'components/input';
import { PUBLIC_PREFIX, COURSE_PREFIX, MOVIE_LIST_PREFIX } from 'configs/app-config';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import Loader from 'components/loader';
import SelectBox from 'components/select-box';
import { getAllVideos, searchVideoData, getAllTypes } from 'actions/video-data';
import { LowerCase, removeScrollBar, showScrollBar } from 'utilities';
import VideoCard from 'components/video-card';
import Offlaner from 'components/offlaner';
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingList from 'components/loading-list';
import { Wrapper, SearchForm, SearchButton, MainContent, CourseList, NoDataWrapper, Heading, Text } from './style';
import { RiSearch2Line } from 'react-icons/ri';

const searchTypes = [
    {
        name: "Keyword"
    },
    {
        name: "Address"
    }
]

const flagSearchs = [
    {
        name: "Popular"
    },
    {
        name: "Trending"
    }
]


function VideoListPage(props) {

    const history = useHistory();
    const [loading, setLoading] = useState(true);

    const [videoList, setVideoList] = useState([]);
    const [videoTypes, setVideoTypes] = useState([]);

    const [searchType, setSearchType] = useState(true);

    const [lastseen, setLastSeen] = useState(1);

    const [listLoading, setListLoading] = useState(true);
    const [searchPlaceHolder, setSearchPlaceHolder] = useState("Search Video By Keyword")

    const [readAll, setReadAll] = useState(true);

    const [exploreData, setExploreData] = useState({
        keyword: "",
        address: "",
        popularState: false,
        trendingState: false,
        selectedId: ""
    })

    const [previousData, setPreviousData] = useState({
        keyword: "",
        address: "",
        popularState: false,
        trendingState: false,
        selectedId: ""
    });

    useEffect(async () => {
        setLoading(true);
        removeScrollBar();

        const { types } = await getAllTypes();
        if (types) {
            setVideoTypes([...types]);
            setLoading(false);
        }
        showScrollBar();

        const { videos } = await getExploreVideo(lastseen);

        setVideoList([...videos]);

        if (videos.length !== 0) {
            setLastSeen(lastseen + videos.length);
        }
        if (props.timer) {
            clearInterval(props.timer);
        }

        if (videos.length < 10) {
            setReadAll(false);
        }

        showScrollBar();
        setListLoading(false);
    }, [])

    const getExploreVideo = async (start) => {
        return await getAllVideos(start);
    }

    const goDetailPage = (item) => {
        removeScrollBar();
        history.push({
            pathname: PUBLIC_PREFIX + MOVIE_LIST_PREFIX + `/${item.id}`
        })
    }

    const changeVideoType = (e) => {
        const text = e.target.options[e.target.selectedIndex].value;

        setExploreData({ ...exploreData, selectedId: LowerCase(text) });
    }

    const setData = (e) => {
        if (searchType) {
            setExploreData({ ...exploreData, keyword: LowerCase(e.target.value) })
        } else {
            setExploreData({ ...exploreData, address: e.target.value })
        }
    }

    const startSearch = async () => {
        setListLoading(true);
        setReadAll(true);
        setPreviousData({ ...exploreData });
        const { results } = await searchVideoData(exploreData, 1);

        if (results.length !== 0) {
            setLastSeen(1 + results.length);
        }
        if (results.length < 10 || exploreData.popularState || exploreData.trendingState) {
            setReadAll(false)
        }
        setVideoList([...results])
        setListLoading(false);
    }

    const loadFunc = async () => {
        const { results } = await searchVideoData(previousData, lastseen);
        if (results.length < 10) {
            setReadAll(false)
        }
        if (results.length !== 0) {
            setLastSeen(lastseen + results.length);
            setVideoList([...videoList.concat(results)]);
        }
    }

    const exploreAllVideo = async () => {
        const { videos } = await getExploreVideo(lastseen);
        if (videos.length === 0 || videos.length < 10) {
            setReadAll(false)
        }
        if (videos.length !== 0) {
            setLastSeen(lastseen + videos.length);
            setVideoList([...videoList.concat(videos)]);
        }
    }

    const searchMoreFunc = () => {
        if (!listLoading) {
            if (previousData.address !== "" || previousData.keyword !== "" || previousData.popularState || previousData.selectedId !== "" || previousData.trendingState) {
                loadFunc();
            } else {
                exploreAllVideo();
            }
        }
    }

    const changeSearchType = (e) => {
        if (e.target.value === "Keyword") {
            setSearchType(true);
            setSearchPlaceHolder("Search Video by Keyword")
        } else {
            setSearchType(false);
            setSearchPlaceHolder("Search Video by Address")
        }
    }

    const changeFlagType = (e) => {
        if (e.target.value === "Popular") {
            setExploreData({ ...exploreData, popularState: true, trendingState: false });
        }
        if (e.target.value === "Trending") {
            setExploreData({ ...exploreData, trendingState: true, popularState: false });
        }
    }

    return (
        <Wrapper>
            {
                loading ? <Loader /> : null
            }
            <Offlaner />
            <Container className='container'>
                <SearchForm>
                    <Row className='search-input'>
                        <Input style={{
                            width: "80%"
                        }} placeholder={searchPlaceHolder} name="keyword" onChange={(e) => setData(e)} />
                        <SearchButton onClick={startSearch}>
                            Search
                        </SearchButton>
                    </Row>
                    <Row className='criteria-search'>
                        <SelectBox typeText='Select Video Type' className='criteria-select-box' id="type-select" onChange={(e) => changeVideoType(e)} data={videoTypes} />
                        <SelectBox typeText='Select Search Type' defaultValue='Keyword' className='criteria-select-box' id="search-type-select" onChange={(e) => changeSearchType(e)} data={searchTypes} />
                        <SelectBox typeText='Search By Popular' className='criteria-select-box' id="search-criteria-select" onChange={(e) => changeFlagType(e)} data={flagSearchs} />
                    </Row>
                </SearchForm>
                <MainContent>
                    {
                        listLoading ?
                            <CourseList>
                                <LoadingList size={5} />
                            </CourseList> :
                            <CourseList className='main-video-list'>
                                <InfiniteScroll
                                    dataLength={videoList.length}
                                    next={searchMoreFunc}
                                    hasMore={readAll}
                                    loader={listLoading ? null : <LoadingList size={5} />}
                                >
                                    {
                                        videoList.length !== 0 ? videoList.map((item, itemKey) => {
                                            return (
                                                <li key={itemKey}>
                                                    <VideoCard types={videoTypes} onClick={() => goDetailPage(item)} item={item} />
                                                </li>
                                            )
                                        }) :
                                            <NoDataWrapper>
                                                <RiSearch2Line className='search-icon' />
                                                <Heading>
                                                    No Data
                                                </Heading>
                                                <Text>
                                                    We cannot find the videos you are searching for. 🤷‍♀️
                                                </Text>
                                            </NoDataWrapper>
                                    }
                                </InfiniteScroll>
                            </CourseList>
                    }
                </MainContent>
            </Container>
        </Wrapper>
    )
}

const mapStateToProps = state => {
    return {
        user__state: state.userState.user_state,
        wallet_address: state.walletState.wallet_address,
        timer: state.dataState.timer
    }
}

export default connect(mapStateToProps)(VideoListPage)

