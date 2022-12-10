import Image from 'components/image-wrapper';
import { Container } from 'components/layout';
import { WalletImage } from 'constants/image-constant';
import { connectwallet } from 'store/actions/action';
import { connect } from 'react-redux';
import { notifyError } from 'utilities';
import { registerUser } from 'actions/user-mg';
import { signed } from 'store/actions/action';
import Offlaner from 'components/offlaner';
import { Card, Text, Heading, Wrapper, WalletList } from './style';
import { setplan, setvideocount, setrate, setpurchasedlist } from 'store/actions/action';

const { Metamask, Bitski, Fortmatic, WalletConnect, Coinbase, Arkane, Authereum, Torus } = WalletImage;

function WalletConnectPage(props) {
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
        const user = await registerUser(account);
        if (user) {
            props.isConnect(account);
            props.isSigned(user.id);
            props.setPlan(user.user.plan);
            props.setVideoCount(user.user.video_count);
            props.setRate(user.user.rate);
            props.setPurchasedList([...user.user.purchased_videos])
        } else {
            notifyError("Error Ocurred");
        }
    };

    return (
        <Wrapper>
            <Offlaner />
            <Container className="wallet-connect-container">
                <WalletList>
                    <li>
                        <Card onClick={ConnectWallet}>
                            <Image src={Metamask} alt="metamask" />
                            <Heading>Metamask</Heading>
                            <Text>
                                Start exploring blockchain applications in seconds.  Trusted by over 1 million users worldwide.
                            </Text>
                        </Card>
                    </li>
                    <li>
                        <Card>
                            <Image src={Bitski} alt="metamask" />
                            <Heading>Bitski</Heading>
                            <Text>
                                Start exploring blockchain applications in seconds.  Trusted by over 1 million users worldwide.
                            </Text>
                        </Card>
                    </li>
                    <li>
                        <Card>
                            <Image src={Fortmatic} alt="metamask" />
                            <Heading>Fortmatic</Heading>
                            <Text>
                                Start exploring blockchain applications in seconds.  Trusted by over 1 million users worldwide.
                            </Text>
                        </Card>
                    </li>
                    <li>
                        <Card>
                            <Image src={WalletConnect} alt="metamask" />
                            <Heading>WalletConnect</Heading>
                            <Text>
                                Start exploring blockchain applications in seconds.  Trusted by over 1 million users worldwide.
                            </Text>
                        </Card>
                    </li>
                    <li>
                        <Card>
                            <Image src={Coinbase} alt="metamask" />
                            <Heading>Coinbase</Heading>
                            <Text>
                                Start exploring blockchain applications in seconds.  Trusted by over 1 million users worldwide.
                            </Text>
                        </Card>
                    </li>
                    <li>
                        <Card>
                            <Image src={Arkane} alt="metamask" />
                            <Heading>Arkane</Heading>
                            <Text>
                                Start exploring blockchain applications in seconds.  Trusted by over 1 million users worldwide.
                            </Text>
                        </Card>
                    </li>
                    <li>
                        <Card>
                            <Image src={Authereum} alt="metamask" />
                            <Heading>Authereum</Heading>
                            <Text>
                                Start exploring blockchain applications in seconds.  Trusted by over 1 million users worldwide.
                            </Text>
                        </Card>
                    </li>
                    <li>
                        <Card>
                            <Image src={Torus} alt="metamask" />
                            <Heading>Torus</Heading>
                            <Text>
                                Start exploring blockchain applications in seconds.  Trusted by over 1 million users worldwide.
                            </Text>
                        </Card>
                    </li>
                </WalletList>
            </Container>
        </Wrapper>
    )
}

const mapStateToProps = state => {
    return {
        wallet_state: state.walletState.wallet_state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        isConnect: (address) => dispatch(connectwallet(address)),
        isSigned: (id) => dispatch(signed(id)),
        setPlan: (data) => dispatch(setplan(data)),
        setVideoCount: (data) => dispatch(setvideocount(data)),
        setRate: (rate) => dispatch(setrate(rate)),
        setPurchasedList: (data) => dispatch(setpurchasedlist(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletConnectPage)