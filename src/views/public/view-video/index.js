import ReactNetflixPlayer from 'react-netflix-player';
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Row } from 'components/layout';
import { connect } from "react-redux";
import { useHistory } from 'react-router-dom';
import { PUBLIC_PREFIX, MOVIE_LIST_PREFIX } from 'configs/app-config';
import Alert from 'components/alert';
import Offlaner from 'components/offlaner';
import LoaderButton from 'components/loading-button';
import { notifyError, removeScrollBar, UpperCase } from 'utilities';
import { SharedImage } from 'constants/image-constant';
import ViewVidImage from 'components/image-wrapper';
import { updateViews, followVideo } from 'actions/user-mg';
import { Wrapper, TextWrapper, Button } from './style';
import { settimer } from 'store/actions/action';
import { addMessage } from 'actions/msg-mg';

const { ThumbsUp, ConfirmIco, HOME_RETURN } = SharedImage;

const ModalStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "Montserrat",
    backgroundColor: "#141517",
    color: "white",
    padding: "50px 0px",
    borderRadius: "20px"
}

const RowButtonStyle = {
    width: "100%",
    gap: "10px",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "30px"
}

const ImageStyle = {
    maxWidth: "200px"
}

const ButtonStyle = {
    maxWidth: "250px",
    backgroundColor: "#555252",
    borderRadius: "15px"
}

const DismissStyle = {
    color: "#746F6F",
    cursor: "pointer"
}

const CustomButtons = ({ follow, noFollow, loading = false }) => {
    return (
        <React.Fragment>
            <Row style={RowButtonStyle}>
                <LoaderButton style={ButtonStyle} loading={loading} onClick={follow} text={UpperCase('Follow video')} />
                <TextWrapper style={DismissStyle} onClick={noFollow}>
                    Dismiss
                </TextWrapper>
            </Row>
        </React.Fragment>
    )
}

const CustomButtonsForService = ({ goList }) => {
    return (
        <React.Fragment>
            <Row style={RowButtonStyle}>
                <Button onClick={goList}>Okay</Button>
            </Row>
        </React.Fragment>
    )
}

function ViewVideo(props) {
    const location = useLocation();
    const [wantFollow, setFollow] = useState(false);
    const [warningModal, setWarning] = useState(false);
    const [successModal, setSuccess] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);
    const [homeReturn, setHomeReturn] = useState(false);

    const history = useHistory();

    useEffect(async () => {
        console.log(props.wallet_address)
        if (location.state) {
            if (location.state.item.data.address !== props.wallet_address) {
                const { isUpdated } = await updateViews(location.state.item);
            }
        } else {
            history.push(PUBLIC_PREFIX + MOVIE_LIST_PREFIX)
        }
    }, [])

    useEffect(() => {
        const timeout = setInterval(() => {
            const obj = document.querySelector("video");
            if (obj.src) {
                var url = new URL(obj.src);
                var name = url.searchParams.get("name");
                if (name !== location.state.item.data.streamId) {
                    history.push("/");
                }
            }
        }, 2000);
        props.setTimer(timeout);
    }, [])

    const FollowVideo = async () => {
        setBtnLoading(true);
        let tempArray = location.state.item.data.follers;
        let flag = 0;

        tempArray.map((item, key) => {
            if (props.wallet_address === item) {
                flag = 1;
            }
        })

        if (flag) {
            setFollow(false);
            setSuccess(false);
            setWarning(true);
        } else {
            tempArray.push(props.wallet_address);
            const { isFollowed } = await followVideo(tempArray, location.state.item.id, location.state.item.data.userId);
            const { isAdded } = await addMessage(location.state.item, props.wallet_address, 1);

            if (isFollowed) {
                setSuccess(true);
            } else {
                notifyError("Error Ocurred");
            }
            setFollow(false);
            setWarning(false);
        }
    }

    const toExplorePage = () => {
        removeScrollBar();
        history.push({
            pathname: PUBLIC_PREFIX + MOVIE_LIST_PREFIX
        })
    }

    const videoEnded = async () => {
        if (location.state.item.data.address !== props.wallet_address) {
            setFollow(true);
        } else {
            setHomeReturn(true);
        }
    }

    return (
        <>
            {
                location.state ?
                    <>
                        <Wrapper>
                            <Offlaner />
                            <ReactNetflixPlayer src={`/data/stream/?name=${location.state.item.data.streamId}`} title={location.state.item.data.title} subTitle="Great! Homeverse.io" fontFamily="Montserrat" autoPlay={true} onEnded={videoEnded} />
                        </Wrapper>
                        <Alert
                            Custom={true}
                            ShowCancel={true}
                            ShowCloseButton={true}
                            ConfirmBtnText="Yes"
                            CancelBtnText="No"
                            Title=""
                            Text={
                                <TextWrapper>
                                    Welcome to Homeverse.io and Thank you for watching. If you like video, please follow it.
                                </TextWrapper>
                            }
                            Show={wantFollow}
                            Style={ModalStyle}
                            CustomIcon={
                                <Row style={{
                                    justifyContent: "center"
                                }}>
                                    <ViewVidImage src={ThumbsUp} style={ImageStyle} />
                                </Row>}
                            customButtons={<CustomButtons loading={btnLoading} follow={() => FollowVideo()} noFollow={() => toExplorePage()} />} />
                        <Alert
                            Warning={true}
                            ShowCancel={true}
                            Text="You already followed this video."
                            onConfirm={toExplorePage}
                            Style={ModalStyle}
                            Show={warningModal}
                            customButtons={<CustomButtonsForService goList={toExplorePage} />} />
                        <Alert
                            Title={
                                <Row style={{
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: "30px"
                                }}>
                                    <ViewVidImage src={ConfirmIco} style={{
                                        maxWidth: "100px"
                                    }} />
                                    Thank you
                                </Row>
                            }
                            onConfirm={toExplorePage}
                            Show={successModal}
                            Style={ModalStyle}
                            customButtons={<CustomButtonsForService goList={toExplorePage} />}
                            Text="You followed video" />
                            <Alert
                            Title={
                                <Row style={{
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: "30px"
                                }}>
                                    <ViewVidImage src={HOME_RETURN} style={{
                                        maxWidth: "100px"
                                    }} />
                                    Return to video list
                                </Row>
                            }
                            onConfirm={toExplorePage}
                            Show={homeReturn}
                            Style={ModalStyle}
                            customButtons={<CustomButtonsForService goList={toExplorePage} />}
                            Text="You followed video" />
                    </> : null
            }
        </>
    )
}

const mapStateToProps = state => {
    return {
        wallet_address: state.walletState.wallet_address
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setTimer: (timer) => dispatch(settimer(timer))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewVideo)