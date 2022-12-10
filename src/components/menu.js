import styled from 'styled-components';
import { notifySuccess, removeScrollBar, showScrollBar, UpperCase } from 'utilities';
import { BiBell } from 'react-icons/bi'
import Button from './button';
import { PUBLIC_PREFIX, MYLIST_PREFIX, MOVIE_LIST_PREFIX, VIEW_NOTIFY, COMING_SOON_PREFIX } from 'configs/app-config';
import { connect } from 'react-redux';
import { connectwallet, notified } from 'store/actions/action';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { notifyError, start_and_end } from 'utilities';
import { registerUser } from 'actions/user-mg';
import { getUnreadMessages } from 'actions/msg-mg';
import { signed, cleared } from 'store/actions/action';
import { setplan, setvideocount, setrate, setpurchasedlist } from 'store/actions/action';
import Loader from './loader';
import { HiOutlineMenu } from 'react-icons/hi';
import { CgClose } from 'react-icons/cg';

const rewardText = "If you receive many follows, there'll be great Reward. Please try to get more follows";
const shopText = "If you want NFTS and other things, you can purchase it in our Shop. NFTs also provide special func.It'll be comming soon"

function Menu(props) {
    const [isConnect, setConnect] = useState(0);
    const [walletAddress, setAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const [menuFlag, setMenuFlag] = useState(false);
    const [menuStyle, setMenuStyle] = useState({})
    const [overlayStyle, setOverlayStyle] = useState(false);
    const history = useHistory();

    const { wallet_state, wallet_address, walletConnect } = props;

    useEffect(async () => {
        setConnect(wallet_state);
        setAddress(wallet_address);
        if (props.wallet_address !== "") {
            const { msgs } = await getUnreadMessages(props.wallet_address);
            if (msgs.length !== 0) {
                props.isNotified();
            } else {
                props.isCleared();
            }
        }
    }, [wallet_state, wallet_address])

    useEffect(() => {
        const { ethereum } = window;
        if (ethereum && ethereum.isMetaMask) {
            ethereum.on("accountsChanged", async (accs) => {
                if (wallet_address !== '') {
                    removeScrollBar();
                    setLoading(true);
                    setAddress(accs[0]);
                    const user = await registerUser(accs[0])
                    if (user) {
                        if (user.user) {
                            props.setPurchasedList([...user.user.purchased_videos])
                            props.isSigned(user.id);
                            props.setPlan(user.user.plan);
                            props.setVideoCount(user.user.video_count);
                            props.setRate(user.user.rate);
                            props.isConnect(accs[0]);
                        } else {
                            props.setPurchasedList([])
                            props.isSigned(user.id);
                            props.setPlan(3);
                            props.setVideoCount(0);
                            props.setRate(0);
                            props.isConnect(accs[0]);
                        }
                    } else {
                        notifyError("Error Ocurred");
                    }
                    showScrollBar();
                    setLoading(false);
                }

            });
            ethereum.on("chainChanged", (chainId) => {
                if (chainId === "0x1") {
                    notifySuccess("Ethereum mainnet connected successfully");
                } else {
                    notifyError("Please connect to Ethereum Mainnet");
                }
            });
        } else {
            notifyError("Please install Metamask wallet")
        }
    }, [wallet_address])

    const connectRoute = (link, data) => {
        if (isConnect) {
            removeScrollBar();
            history.push({
                pathname: link,
                state: {
                    data: data
                }
            })
            hideMenu();
        } else {
            notifyError("Please connect your wallet");
        }
    }

    const changeRoute = (link, data) => {
        history.push({
            pathname: link,
            state: {
                data: data
            }
        })
        hideMenu();
    }

    const hideMenu = () => {
        showScrollBar();
        setMenuStyle({
            maxWidth: "0px",
            padding: "100px 0px"
        })
        setOverlayStyle(false)
        setMenuFlag(false);
    }

    const showMenu = () => {
        if (menuFlag) {
            hideMenu();
        } else {
            removeScrollBar();
            setOverlayStyle(true)
            setMenuStyle({
                maxWidth: "290px",
                padding: "100px 30px"
            })
            setMenuFlag(true);
        }
    }

    return (
        <Content>
            {
                loading ? <Loader /> : null
            }
            <Wrapper className='menu-list'>
                <li onClick={() => changeRoute(PUBLIC_PREFIX + MOVIE_LIST_PREFIX)}>
                    {
                        UpperCase('Explore')
                    }
                </li>
                <li onClick={() => changeRoute(PUBLIC_PREFIX + COMING_SOON_PREFIX, rewardText)}>
                    {UpperCase('reward')}
                </li>
                <li onClick={() => changeRoute(PUBLIC_PREFIX + COMING_SOON_PREFIX, shopText)}>
                    {UpperCase('shop')}
                </li>
                <li>
                    <a href='https://homeverseio.gitbook.io/homeverseio/' target='_blank'>
                        {UpperCase('help')}
                    </a>
                </li>
                <li onClick={() => connectRoute(PUBLIC_PREFIX + MYLIST_PREFIX + `/${wallet_address}`)}>
                    {UpperCase('my list')}
                </li>
            </Wrapper>
            <Wrapper className='rwd-list' style={menuStyle}>
                <li onClick={() => changeRoute(PUBLIC_PREFIX + MOVIE_LIST_PREFIX)}>
                    {
                        UpperCase('Explore')
                    }
                </li>
                <li onClick={() => changeRoute(PUBLIC_PREFIX + COMING_SOON_PREFIX, rewardText)}>
                    {UpperCase('reward')}
                </li>
                <li onClick={() => changeRoute(PUBLIC_PREFIX + COMING_SOON_PREFIX, shopText)}>
                    {UpperCase('shop')}
                </li>
                <li>
                    <a href='https://homeverseio.gitbook.io/homeverseio/' target='_blank'>
                        {UpperCase('help')}
                    </a>
                </li>
                <li onClick={() => connectRoute(PUBLIC_PREFIX + MYLIST_PREFIX + `/${wallet_address}`)}>
                    {UpperCase('my list')}
                </li>
                <li>
                    {
                        isConnect ? start_and_end(walletAddress) : <div onClick={() => walletConnect()} >{UpperCase("Connect wallet")}</div>
                    }
                </li>
                <CgClose className='cg-close' onClick={() => hideMenu()} />
            </Wrapper>
            <MetaWrapper>
                <BellWrapper onClick={() => connectRoute(PUBLIC_PREFIX + VIEW_NOTIFY)}>
                    {
                        props.notify_state ? <NotifyMessgae /> : null

                    }
                    <BiBell className='bell' />
                </BellWrapper>
                <ConnectButtonWrapper>
                    {
                        isConnect ? <Address>{start_and_end(walletAddress)}</Address> : <Button text="Connect Wallet" onClick={walletConnect} />
                    }
                </ConnectButtonWrapper>
                <HiOutlineMenu className='rwd-menu' onClick={() => showMenu()} />
            </MetaWrapper>
            <MenuOverlay onClick={() => hideMenu()} flag={overlayStyle} />
        </Content>
    )
}

const mapStateToProps = state => {
    return {
        wallet_state: state.walletState.wallet_state,
        wallet_address: state.walletState.wallet_address,
        notify_state: state.userState.notify_state,
        uploaded_list: state.userState.uploaded_list,
        timer: state.dataState.timer,
        rate: state.userState.rate,
        plan: state.userState.plan,
        count: state.userState.count,
        purchased_list: state.userState.purchased_list

    }
}

const mapDispatchToProps = dispatch => {
    return {
        isConnect: (address) => dispatch(connectwallet(address)),
        isNotified: () => dispatch(notified()),
        isSigned: (id) => dispatch(signed(id)),
        setPlan: (data) => dispatch(setplan(data)),
        setVideoCount: (data) => dispatch(setvideocount(data)),
        setRate: (rate) => dispatch(setrate(rate)),
        setPurchasedList: (data) => dispatch(setpurchasedlist(data)),
        isCleared: () => dispatch(cleared())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)

const Content = styled.div`
    display: flex;
    flex-direction: row;
    gap: 30px;
    font-family:Montserrat;
    font-weight:bold;
    align-items:center;
    flex-flow:wrap;
    .menu-list{
        @media screen and (max-width:1160px) {
           display: none;
        }
    }
    .rwd-list{
        display: none;
        position: relative;
        transition: all .3s;
        @media screen and (max-width:1160px) {
            display: flex;
            flex-direction: column;
            position: fixed;
            left: 0px;
            z-index: 5;
            background-color: #141417;
            bottom: 0px;
            top: 0px;
            right: 0px;
            max-width: 0px;
            overflow: hidden;
        }
        li{
            width: 100%;
            white-space: nowrap;
        }
        .cg-close{
            position: absolute;
            right: 30px;
            top: 30px;
            font-size: 24px;
        }
    }
`

const Wrapper = styled.ul`
    padding:0px;
    margin:0px;
    display:flex;
    flex-direction:row;
    list-style:none;
    gap:30px;
    a{
        color: white;
        text-decoration:none;
    }
    li{
        cursor: pointer;
    }
`

const MetaWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 30px;
    .bell{
        font-size:24px;
    }
    .rwd-menu{
        font-size: 24px;
        display: none;
        @media screen and (max-width:1160px) {
            display: block;
        }
    }
`

const Address = styled.div`
    border:2px solid white;
    padding:10px;
    border-radius:9999px;
`
const BellWrapper = styled.div`
    position:relative;
    cursor:pointer;
`

const NotifyMessgae = styled.div`
    position:absolute;
    width:10px;
    height:10px;
    right:0px;
    border-radius:50%;
    background-color:red;
`
const ConnectButtonWrapper = styled.div`
        @media screen and (max-width:1160px) {
            display: none;
        }
`
const MenuOverlay = styled.div`
    position:fixed;
    z-index:3;
    background-color:rgba(0,0,0,.6);
    top:0px;
    left:0px;
    right:0px;
    bottom:0px;
    display: none;
    @media screen and (max-width:1160px){
        display: ${props => props.flag ? "block" : "none"};
    }
`