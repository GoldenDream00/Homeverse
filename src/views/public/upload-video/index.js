import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { Container, Row } from 'components/layout';
import Input from 'components/input';
import TextArea from 'components/textarea';
import { useEffect, useState } from 'react';
import HomeverseImage from 'components/image-wrapper';
import SelectBox from 'components/select-box';
import { notifyError, notifySuccess, getCurrentSeconds, parseBigNumber, UpperCase, getCroppedImg, getVideoImage, generateKeywords, LowerCase } from 'utilities';
import { connect } from 'react-redux';
import LoaderButton from 'components/loading-button';
import { getAllTypes } from 'actions/video-data';
import { addVideoData } from 'actions/user-mg';
import { homeverseioContract } from 'contracts/homeverseio';
import { SharedImage } from 'constants/image-constant';
import Loader from 'components/loader';
import ReactCrop from 'react-image-crop';
import Alert from 'components/alert';
import Offlaner from 'components/offlaner';
import { setvideocount } from 'store/actions/action';
import { InfoContent, Label, InfoLabel, ImageLabel, ContractInfoWrapper, UploadContentWrapper, FileInfoWrapper, Wrapper, TabWrapper, TextWrapper } from './style';
import { PUBLIC_PREFIX } from 'configs/app-config';
import { useHistory } from 'react-router-dom';

const TextAreaStyle = {
    marginTop: "30px"
}

const UploadStyle = {
    display: "none !important"
}

const UploadedImageStyle = {
    maxWidth: "250px",
    cursor: "pointer"
}

const ModalStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "Montserrat",
    backgroundColor: "#141517",
    color: "white",
    padding: "50px 20px",
    borderRadius: "20px"
}

const CustomButtonStyle = {
    gap: "20px",
    display: "flex !important",
    flexDirection: "row !important",
    width: "100%",
    justifyContent: "center",
    padding: "10px"
}

const { Eth, UploadIcon, UploadVideo, Loading } = SharedImage;

const CustomButtons = ({ onClick }) => {
    return (
        <>
        <LoaderButton style={{
            maxWidth:"250px"
        }} onClick={onClick} text="Okay"/>
        </>           
    )
}

const CropperCustomButtons = ({ confirm, cancel }) => {
    return (
        <Row style={CustomButtonStyle}>
            <LoaderButton onClick={confirm} text="Ok" />
            <LoaderButton onClick={cancel} text="Cancel" />
        </Row>
    )
}

function UploadVideoPage(props) {

    const [videoData, setVideoData] = useState({
        title: "",
        overview: ""
    });


    const history = useHistory();

    const [cropImageModal, setCropImageModal] = useState(false);

    const [selectedId, setId] = useState("");
    const [buttonLoading, setBtnLoading] = useState(false);
    const [loading, setLoading] = useState(true);

    const [uploadedImage, setImage] = useState(null);
    const [uploadedVideo, setVideo] = useState(null);
    const [convertedImage, setConvertedImage] = useState("");

    const [uploadedImageInfo, setImageInfo] = useState({
        fileName: "",
        fileSize: "",
        fileType: ""
    });

    const [videoImage, setVideoImage] = useState(null);


    const [videoTypes, setVideoTypes] = useState([]);

    const [uploadedVideoInfo, setVideoInfo] = useState({
        fileName: "",
        fileSize: "",
        fileType: ""
    })

    const [videoPrice, setVideoPrice] = useState(0);
    const [feeOfVideo, setFee] = useState(0);

    const [defaultSelect, setDefaultSelect] = useState("none");

    const [feeAmount, setFeeAmount] = useState(0);
    const [uploadModal, setUploadModal] = useState(false);

    const [selectionCrop, setSelectionCrop] = useState({
        x: 10,
        y: 10,
        width: 80,
        height: 80,
        unit: "%"
    });
    const [croppedImage, setCroppedImage] = useState(null);

    const [cropModalSize, setCropModalSize] = useState({
        width: "",
        height: ""
    })

    const [minCropInfo, setMinCropInfo] = useState({
        width: 0,
        height: 0
    })

    const [confrimedCroppedImage, setConfrimedCroppedImage] = useState(null);

    useEffect(async () => {
        if(props.wallet_address === "") {
            history.push(PUBLIC_PREFIX);
            return notifyError("Please connect your wallet")
        }
        const { types } = await getAllTypes();
        setVideoTypes([...types]);
        setLoading(false);
    }, []);

    useEffect(async () => {
        const fee = await homeverseioContract.feeAmount();
        setFee(fee.toString());
    }, [])

    const imageUploaded = async (e) => {

        const file = e.target.files[0];

        setImage(file);

        setConvertedImage(URL.createObjectURL(file));

        if (file) {
            setImageInfo({ ...uploadedImageInfo, fileName: file.name, fileSize: file.size, fileType: file.type });
            toShowModal(URL.createObjectURL(file));
        }
    }

    const toShowModal = async (image) => {
        if (await checkImgState(image)) {
            setConfrimedCroppedImage(null);
            setCroppedImage(null);
            setCropImageModal(true);
        } else {
            notifyError("You need 600*600 px image at least")
        }
    }

    const initCropSelection = () => {

        const image = new Image();
        image.src = convertedImage;

        const obj = document.querySelector("#img-for-crop");

        const changedWidth = obj.clientWidth;
        const changedHeight = obj.clientHeight;

        const minW = changedWidth * 600 / image.width;
        const minH = changedHeight * 600 / image.height;

        const x = (changedWidth - minW) / 2;
        const y = (changedHeight - minH) / 2;

        setSelectionCrop({ ...selectionCrop, width: minW, height: minH, unit: "px", x: x, y: y })

        setMinCropInfo({ ...minCropInfo, width: minW, height: minH });
    }

    const checkImgState = (imgage) => {
        let flag = false;

        const img = new Image();

        return new Promise((resolve, reject) => {
            img.onload = function () {
                setCropModalSize({ ...cropModalSize, width: this.width + "px", height: this.height + "px" });
                if (parseInt(this.width) >= 600 && parseInt(this.height) >= 600) {
                    flag = true;
                }
                resolve(flag);
            }
            img.src = imgage;
        })
    }

    const videoUpload = async (e) => {
        const file = e.target.files[0];
        const temp = await getVideoImage(file);
        setVideoImage(URL.createObjectURL(temp));
        setVideo(file);
        setVideoInfo({ ...uploadedVideoInfo, fileName: file.name, fileSize: file.size, fileType: file.type });
    }

    const changeImage = () => {
        var file = document.querySelector('#image-upload');
        file.click();
    }

    const changeData = (e) => {
        setVideoData({ ...videoData, [e.target.name]: e.target.value });
    }

    const changeVideoType = async (e) => {
        const text = e.target.options[e.target.selectedIndex].value;
        document.querySelector("#type-select").value = text;
        setDefaultSelect(text);

        if (text === "business") {
            const price = await homeverseioContract.businessCost();
            const fee = (parseBigNumber(price.toString()) / 100 * feeOfVideo).toString();
            setVideoPrice(parseBigNumber(price.toString()));
            setFeeAmount(fee.slice(0, 4));
        }
        if (text === "movie") {
            const price = await homeverseioContract.movieCost();
            const fee = (parseBigNumber(price.toString()) / 100 * feeOfVideo).toString();
            setVideoPrice(parseBigNumber(price.toString()));
            setFeeAmount(fee.slice(0, 4));
        }
        if (text === "news") {
            const price = await homeverseioContract.newsCost();
            const fee = (parseBigNumber(price.toString()) / 100 * feeOfVideo).toString();
            setVideoPrice(parseBigNumber(price.toString()));
            setFeeAmount(fee.slice(0, 4));
        }
        if (text === "tech") {
            const price = await homeverseioContract.techCost();
            const fee = (parseBigNumber(price.toString()) / 100 * feeOfVideo).toString();
            setVideoPrice(parseBigNumber(price.toString()));
            setFeeAmount(fee.slice(0, 4));
        }
        if (text === "fun") {
            const price = await homeverseioContract.funCost();
            const fee = (parseBigNumber(price.toString()) / 100 * feeOfVideo).toString();
            setVideoPrice(parseBigNumber(price.toString()));
            setFeeAmount(fee.slice(0, 4));
        }
        if (text === "free") {
            setFeeAmount(0);
            setVideoPrice(0);
        }
        setId(text);
    }

    const checkPlan = async () => {
        if (videoData.title && videoData.overview && uploadedImage && uploadedVideo && selectedId) {
            setBtnLoading(true);

            if (props.plan === props.count && selectedId !== "free" ) {
                setBtnLoading(false);
                return notifyError("Upgrade your account");
            }
            setUploadModal(true)
            AddVideoData();
        } else {
            notifyError("All filed is required");
            setBtnLoading(false);
        }
    }

    const AddVideoData = async () => {
        const titleKeywords = generateKeywords(videoData.title);
        const overviewKeywords = generateKeywords(videoData.overview);

        const data = {
            title: videoData.title,
            overview: videoData.overview,
            type: selectedId,
            posterImage: uploadedImage,
            video: uploadedVideo,
            address: LowerCase(props.wallet_address),
            titleKeywords: titleKeywords,
            overviewKeywords: overviewKeywords,
            id: props.user_id,
            count:props.count + 1
        }

        const res = await addVideoData(data);

        if (res) {
            notifySuccess("Video uploaded");
            setId("");
            setUploadModal(false);
            document.querySelector("#type-select").value = "none";
            setDefaultSelect('none');
            setVideoPrice(0);
            setFeeAmount(0);
            if(data.type !== "free") {
                props.setVideoCount(data.count);
            }
            setBtnLoading(false);

        } else {
            setBtnLoading(false);
        }
    }

    const completedCrop = async (c) => {

        let tempCrop = null;

        if (!c) {
            tempCrop = selectionCrop;
        } else {
            tempCrop = c;
        }

        const image = new Image();
        image.src = convertedImage;

        const obj = document.querySelector("#img-for-crop");

        const changedWidth = obj.clientWidth;
        const changedHeight = obj.clientHeight;

        const width = image.width / changedWidth * tempCrop.width;
        const height = image.height / changedHeight * tempCrop.height;

        const x = image.width / changedWidth * tempCrop.x;
        const y = image.width / changedHeight * tempCrop.y;

        tempCrop.width = width;
        tempCrop.height = height;
        tempCrop.x = x;
        tempCrop.y = y;

        const fileName = getCurrentSeconds();

        const cropImg = await getCroppedImg(image, tempCrop, fileName);
        return cropImg;
    }

    const confirmCrop = async () => {
        const blobImage = await completedCrop();
        let tempCroppedImage = URL.createObjectURL(blobImage);

        if (!croppedImage) {
            setImage(blobImage);
            setConfrimedCroppedImage(tempCroppedImage);
            setCropImageModal(false);
        }
        else {
            setImage(blobImage);
            setConfrimedCroppedImage(tempCroppedImage);
            setCropImageModal(false);
        }
    }

    const cancelCropImageModal = () => {
        setCropImageModal(false);
    }

    return (
        <Wrapper>
            {
                loading ? <Loader /> : null
            }
            <Offlaner />
            <Container className='container'>
                <Row className='heading-wrapper'>
                    <LoaderButton className="btn-upload-video" disable={buttonLoading} onClick={checkPlan} text="Upload" loading={buttonLoading} />
                </Row>
                <Tabs className='upload-tab'>
                    <TabList>
                        <Tab>General</Tab>
                        <Tab>Video</Tab>
                    </TabList>
                    <TabPanel>
                        <Input value={videoData.title} label='Title' onChange={(e) => changeData(e)} name="title" />
                        <TextArea value={videoData.overview} label='Overview' name="overview" onChange={(e) => changeData(e)} style={TextAreaStyle} />
                    </TabPanel>
                    <TabPanel>
                        <TabWrapper>
                            {
                                confrimedCroppedImage === null ?
                                    <ImageLabel>
                                        <Input accept='image/*' id="image-upload" type='file' name='file' style={UploadStyle} onChange={(e) => imageUploaded(e)} />
                                        <HomeverseImage src={UploadIcon} />
                                    </ImageLabel> :
                                    <UploadContentWrapper>
                                        <Input accept='image/*' id="image-upload" type='file' name='file' style={UploadStyle} onChange={(e) => imageUploaded(e)} />
                                        <HomeverseImage style={UploadedImageStyle} onClick={changeImage} src={confrimedCroppedImage} alt="uploadedImage" className="uploaded-image" />
                                        <FileInfoWrapper>
                                            <p>
                                                {
                                                    uploadedImageInfo.fileName
                                                }
                                            </p>
                                            <p>
                                                {
                                                    uploadedImageInfo.fileSize
                                                }
                                            </p>
                                            <p>
                                                {
                                                    uploadedImageInfo.fileType
                                                }
                                            </p>
                                        </FileInfoWrapper>
                                    </UploadContentWrapper>
                            }
                            {
                                uploadedVideo === null ?
                                    <ImageLabel>
                                        <Input accept='video/*' id="video-upload" type='file' name='file' style={UploadStyle} onChange={(e) => videoUpload(e)} />
                                        <HomeverseImage src={UploadVideo} />
                                    </ImageLabel> : <UploadContentWrapper>
                                        <ImageLabel className='video-upload-label'>
                                            <Input accept='video/*' id="video-upload" type='file' name='file' style={UploadStyle} onChange={(e) => videoUpload(e)} />
                                            <HomeverseImage src={videoImage} />
                                        </ImageLabel>
                                        <FileInfoWrapper>
                                            <p>
                                                {
                                                    uploadedVideoInfo.fileName
                                                }
                                            </p>
                                            <p>
                                                {
                                                    uploadedVideoInfo.fileSize
                                                }
                                            </p>
                                            <p>
                                                {
                                                    uploadedVideoInfo.fileType
                                                }
                                            </p>
                                        </FileInfoWrapper>
                                    </UploadContentWrapper>
                            }
                        </TabWrapper>
                        <ContractInfoWrapper>
                            <SelectBox typeText="Select Video Type" id="type-select" label='Type' defaultValue={defaultSelect} onChange={(e) => changeVideoType(e)} data={videoTypes} />
                            <InfoLabel>
                                <Label>
                                    {
                                        UpperCase("Price")
                                    }
                                </Label>
                                <InfoContent>
                                    {
                                        videoPrice
                                    }
                                    <HomeverseImage src={Eth} alt="eth" />
                                </InfoContent>
                            </InfoLabel>
                            <InfoLabel>
                                <Label>
                                    {
                                        UpperCase("Fee")
                                    }
                                </Label>
                                <InfoContent>
                                    {
                                        feeAmount
                                    }
                                    <HomeverseImage src={Eth} alt="eth" />
                                </InfoContent>
                            </InfoLabel>
                        </ContractInfoWrapper>
                    </TabPanel>
                </Tabs>
                <Alert Title="" Text={
                    <ReactCrop
                        aspect={1}
                        keepSelection
                        minHeight={minCropInfo.height}
                        minWidth={minCropInfo.width}
                        crop={selectionCrop}
                        onChange={c => setSelectionCrop(c)}
                        onComplete={(c) => completedCrop(c)}>
                        <HomeverseImage id="img-for-crop" src={convertedImage} onLoad={initCropSelection} />
                    </ReactCrop>
                }
                    Style={{
                        width: "600px",
                        backgroundColor: "#141517"
                    }}
                    Show={cropImageModal}
                    onConfirm={() => setCropImageModal(false)}
                    customButtons={<CropperCustomButtons confirm={confirmCrop} cancel={cancelCropImageModal} />} />
                <Alert
                    Custom={true}
                    ShowCancel={true}
                    ShowCloseButton={true}
                    ConfirmBtnText="Yes"
                    CancelBtnText="No"
                    Title=""
                    Text={
                        <TextWrapper>
                            If your video is large, it'll take some minutes. 
                            Please wait while uploading video
                        </TextWrapper>
                    }
                    Show={uploadModal}
                    Style={ModalStyle}
                    CustomIcon={
                        <Row style={{
                            justifyContent: "center",
                            paddingBottom:"30px"
                        }}>
                            <HomeverseImage src={Loading} />
                        </Row>}
                    customButtons={<CustomButtons onClick={() =>  setUploadModal(false) } />} />
            </Container>
        </Wrapper>
    )
}

const mapStateToProps = state => {
    return {
        wallet_address: state.walletState.wallet_address,
        uploaded_list: state.userState.uploaded_list,
        user_id: state.userState.user_id,
        count: state.userState.count,
        plan: state.userState.plan
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setVideoCount: (data) => dispatch(setvideocount(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UploadVideoPage);