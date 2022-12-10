import styled from 'styled-components';
import { Container } from './layout';
import { SharedImage, WalletImage } from 'constants/image-constant';
import Image from './image-wrapper';
import Menu from './menu';
import { Link } from 'react-router-dom';
import { PUBLIC_PREFIX } from 'configs/app-config';
import Alert from './alert';
import { Row } from './layout';
import LoaderButton from './loading-button';
import { useState } from 'react';
import { notifyError, notifySuccess } from 'utilities';
import { registerUser } from 'actions/user-mg';
import { connectwallet, signed, setplan, setvideocount, setrate, setpurchasedlist } from 'store/actions/action';
import { connect } from 'react-redux';

const { Logo } = SharedImage;
const { Metamask } = WalletImage;

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

const CustomButtons = ({ onConnect, connectLoading, onCancel }) => {
    return (
        <>
            <Row style={{
                justifyContent:"center"
            }}>
                <LoaderButton style={{
                    maxWidth: "250px"
                }} onClick={onConnect} loading={connectLoading} text="Connect Wallet" />
                <DismissButton disabled={connectLoading} onClick={onCancel}>
                    Dismiss
                </DismissButton>
            </Row>
        </>
    )
}

function Header(props) {

    const [connectModal, setConnectModal] = useState(false);
    const [connectLoading, setConnectLoading] = useState(false);

    const ConnectWallet = () => {
        if (window.ethereum) {
            window.ethereum
                .request({ method: "eth_requestAccounts" })
                .then((res) => accountChangeHandler(res[0]));
        } else {
            notifyError("Please install Metamask Wallet");
        }
    }

    const accountChangeHandler = async (account) => {
        setConnectLoading(true);
        const user = await registerUser(account);

        if (user) {
            if(user.user) {
                props.isConnect(account);
                props.isSigned(user.id);
                props.setPlan(user.user.plan);
                props.setVideoCount(user.user.video_count);
                props.setRate(user.user.rate);
                props.setPurchasedList([...user.user.purchased_videos])
            } else {
                props.isConnect(account);
                props.isSigned(user.id);
                props.setPlan(3);
                props.setVideoCount(0);
                props.setRate(0);
                props.setPurchasedList([])
            }
            notifySuccess("Welcome to Homeverseio !")
            setConnectModal(false);
            setConnectLoading(false);
        } else {
            notifyError("Error Ocurred");
            setConnectModal(false);
            setConnectLoading(false);
        }
    };

    return (
        <>
            <Wrapper>
                <Container className='container'>
                    <Link to={PUBLIC_PREFIX}>
                        <Image src={Logo} alt="Logo" />
                    </Link>
                    <Menu walletConnect={() => setConnectModal(true)} />
                </Container>
            </Wrapper>
            <Alert
                Custom={true}
                ShowCancel={true}
                ShowCloseButton={true}
                ConfirmBtnText="Yes"
                CancelBtnText="No"
                Title=""
                onConfirm={() => setConnectModal(false)}
                Text={
                    <TextWrapper>
                        Welcome to Homeverseio. Before start, make sure metamask is installed.
                    </TextWrapper>
                }
                Show={connectModal}
                Style={ModalStyle}
                CustomIcon={
                    <Row style={{
                        justifyContent: "center",
                        paddingBottom: "30px"
                    }}>
                        <Image src={Metamask} />
                    </Row>}
                customButtons={<CustomButtons onCancel={() => setConnectModal(false)} connectLoading={connectLoading} onConnect={() => ConnectWallet()} />} />
        </>
    )
}

const mapStateToProps = state => {
    return {
        wallet_state: state.walletState.wallet_state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        isSigned: (id) => dispatch(signed(id)),
        setPlan: (data) => dispatch(setplan(data)),
        setVideoCount: (data) => dispatch(setvideocount(data)),
        setRate: (rate) => dispatch(setrate(rate)),
        setPurchasedList: (data) => dispatch(setpurchasedlist(data)),
        isConnect: (address) => dispatch(connectwallet(address))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)


const Wrapper = styled.header`
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
    background-color:#141517;
    color:white;
    img{
        max-height:50px;
    }
    padding: 20px;
    .container{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: 30px;
    }
`
const TextWrapper = styled.div`
    line-height: 32px;
    padding-bottom: 30px;
    max-width: 447px;
`
const DismissButton = styled.button`
    margin-top: 10px;
    cursor: pointer;
    border: none;
    background-color: transparent;
    color: white;
    font-family: Montserrat;
`