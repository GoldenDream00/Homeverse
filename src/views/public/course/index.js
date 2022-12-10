import { Container, Row } from 'components/layout';
import CourseImage from 'components/image-wrapper';
import { connect } from "react-redux";
import { useEffect, useState } from 'react';
import { COURSE_PREFIX, DETAIL_VIEW, PUBLIC_PREFIX, VIEW_COURSE_PREFIX } from 'configs/app-config';
import { useHistory } from 'react-router-dom';
import { Capitalize, notifyError, notifySuccess, removeScrollBar, showScrollBar } from 'utilities';
import { homeverseioContract } from 'contracts/homeverseio';
import { ethers } from 'ethers';
import Loader from 'components/loader';
import { purchaseNewVideo } from 'actions/user-mg';
import { getVideoInfoData } from 'actions/video-data';
import { addMessage } from 'actions/msg-mg';
import Offlaner from 'components/offlaner';
import { Wrapper, ImageWrapper, Text, TextWrapper, Heading, KeywordWrapper } from './style';
import LoaderButton from 'components/loading-button';
import { HiOutlineThumbUp } from 'react-icons/hi';
import { BsEyeFill } from 'react-icons/bs';
import { SiEthereum } from 'react-icons/si';
import { MdFilterListAlt } from 'react-icons/md';
import { setpurchasedlist } from 'store/actions/action';

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

function CoursePage(props) {
    const history = useHistory();
    const [flag, setFlag] = useState(false);
    const [loading, setLoading] = useState(true);
    const [btnLoading, setBtnLoading] = useState(false);
    const [type, setType] = useState("");
    const [videoData, setVideoData] = useState(null)

    useEffect(async () => {
        removeScrollBar();
        setLoading(true);
        const url = window.location.href;
        const videoId = url.split("/").pop();
        if (props.timer) {
            clearInterval(props.timer);
        }
        const { data } = await getVideoInfoData(videoId);

        if (data.data) {
            setType(data.data.type);
            setVideoData(data);
            let tempFlag = false;

            props.purchased_list.forEach((item) => {
                if (item.id === videoId) {
                    tempFlag = true;
                }
            })
            setLoading(false);
            setFlag(tempFlag);
            showScrollBar();
        } else {
            history.push(PUBLIC_PREFIX + "/404")
        }

    }, [props.wallet_address])


    const watchTV = () => {
        if (props.wallet_address !== "") {
            history.push({
                pathname: PUBLIC_PREFIX + VIEW_COURSE_PREFIX,
                state: {
                    item: videoData
                }
            })
        } else {
            notifyError("Please connect your wallet");
        }
    }

    const purchaseVideo = async () => {
        if (props.wallet_address === "") {
            notifyError("Please connect your wallet");
        } else {
            setBtnLoading(true);
            if (type === "news") {
                try {
                    const pay = await homeverseioContract.getAccessOfNews(videoData.data.address, { value: ethers.utils.parseEther("0.3") });
                    const receipt = await pay.wait();
                    if (receipt) {
                        addNewVideo("0.3");
                    }
                } catch (err) {
                    if (err.code === "INSUFFICIENT_FUNDS") {
                        notifyError("Insufficient funds");
                    }
                    setBtnLoading(false);
                }
            }
            if (type === "movie") {
                try {
                    const pay = await homeverseioContract.getAccessOfMovie(videoData.data.address, { value: ethers.utils.parseEther("0.1") });
                    const receipt = await pay.wait();
                    if (receipt) {
                        addNewVideo("0.1");
                    }
                } catch (err) {
                    if (err.code === "INSUFFICIENT_FUNDS") {
                        notifyError("Insufficient funds");
                    }
                    setBtnLoading(false);
                }
            }
            if (type === "business") {
                try {
                    const pay = await homeverseioContract.getAccessOfBusiness(videoData.data.address, { value: ethers.utils.parseEther("0.2") });
                    const receipt = await pay.wait();
                    if (receipt) {
                        addNewVideo("0.2");
                    }
                } catch (err) {
                    if (err.code === "INSUFFICIENT_FUNDS") {
                        notifyError("Insufficient funds");
                    }
                    setBtnLoading(false);
                }
            }
            if (type === "tech") {
                try {
                    const pay = await homeverseioContract.getAccessOfTech(videoData.data.address, { value: ethers.utils.parseEther("0.2") });
                    const receipt = await pay.wait();
                    if (receipt) {
                        addNewVideo("0.2");
                    }
                } catch (err) {
                    if (err.code === "INSUFFICIENT_FUNDS") {
                        notifyError("Insufficient funds");
                    }
                    setBtnLoading(false);
                }
            }
            if (type === "fun") {
                try {
                    const pay = await homeverseioContract.getAccessOfFun(videoData.data.address, { value: ethers.utils.parseEther("0.1") });
                    const receipt = await pay.wait();
                    if (receipt) {
                        addNewVideo("0.1");
                    }
                } catch (err) {
                    if (err.code === "INSUFFICIENT_FUNDS") {
                        notifyError("Insufficient funds");
                    }
                    setBtnLoading(false);
                }
            }
        }
    }

    const changeRoute = (link, data) => {
        if (props.wallet_address !== "") {
            var addedFlagData = data;
            addedFlagData.data.flag = flag;

            history.push({
                pathname: link,
                state: {
                    item: addedFlagData
                }
            })
        } else {
            notifyError("Please connect your wallet")
        }
    }

    const addNewVideo = async () => {
        const { purchased } = await purchaseNewVideo(props.user_id, props.purchased_list, videoData);
        const { isAdded } = await addMessage(videoData, props.wallet_address, 0);
        if (purchased && isAdded) {
            notifySuccess("Success");
            const tempArray = [...props.purchased_list];
            tempArray.push(videoData);
            props.setPurchasedList([...tempArray]);
            setFlag(true);
        } else {
            notifyError("Error Occurred")
        }
        setBtnLoading(false);
    }

    return (
        <>
            {
                <Wrapper>
                    {
                        loading ? <Loader /> : null
                    }
                    <Offlaner />
                    {
                        videoData ? <Container className='container'>
                            <ImageWrapper>
                                <CourseImage src={videoData.data.posterImage} alt="course" />
                            </ImageWrapper>
                            <TextWrapper>
                                <Heading>{videoData.data.title}</Heading>
                                <Text>
                                    {videoData.data.overview}
                                </Text>
                                <Row className='keyword-wrapper'>
                                    <KeywordWrapper>
                                        <HiOutlineThumbUp className='keyword' /> {videoData.data.follers.length}
                                    </KeywordWrapper>
                                    <KeywordWrapper>
                                        <BsEyeFill className='keyword' /> {videoData.data.views}
                                    </KeywordWrapper>
                                    <KeywordWrapper>
                                        <SiEthereum className='keyword' /> <MoviePrice name={videoData.data.type} />
                                    </KeywordWrapper>
                                    <KeywordWrapper>
                                        <MdFilterListAlt className='keyword' /> {Capitalize(videoData.data.type)}
                                    </KeywordWrapper>
                                </Row>
                                {
                                    videoData.data.address === props.wallet_address || flag || videoData.data.type === "free" ?
                                        <Row className='tool-bar'>
                                            <LoaderButton text="Watch TV" onClick={() => watchTV()} />
                                            <LoaderButton text="Reviews" onClick={() => changeRoute(PUBLIC_PREFIX + DETAIL_VIEW, videoData)} />
                                        </Row> :
                                        <Row className='tool-bar'>
                                            <LoaderButton text="Purchase Video" loading={btnLoading} onClick={purchaseVideo} />
                                            <LoaderButton text="Reviews" onClick={() => changeRoute(PUBLIC_PREFIX + DETAIL_VIEW, videoData)} />
                                        </Row>
                                }
                            </TextWrapper>
                        </Container> : null
                    }
                </Wrapper>
            }
        </>
    )
}

const mapStateToProps = state => {
    return {
        user__state: state.userState.user__state,
        wallet_address: state.walletState.wallet_address,
        timer: state.dataState.timer,
        purchased_list: state.userState.purchased_list,
        user_id: state.userState.user_id
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setPurchasedList: (data) => dispatch(setpurchasedlist(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage)