import { Container, Row } from 'components/layout';
import { ethers } from 'ethers';
import { connect } from 'react-redux';
import { notifyError, notifySuccess, removeScrollBar, showScrollBar } from 'utilities';
import { useEffect, useState } from 'react';
import { homeverseioContract } from 'contracts/homeverseio';
import { upgradeUserPlan } from 'actions/user-mg';
import Loader from 'components/loader';
import LoaderButton from 'components/loading-button';
import Offlaner from 'components/offlaner';
import { setplan } from 'store/actions/action';
import { Text, TextWrapper, Heading, Heading3, FaqList, CardWrapper, PlanList, PlanWrapper, Wrapper } from './style';
import { PUBLIC_PREFIX } from 'configs/app-config';
import { useHistory } from 'react-router-dom';

function UpgradePlanPage(props) {

    const history = useHistory();

    const [userPlan, setUserPlan] = useState(0);
    const [loading, setLoading] = useState(true);
    const [btnState, setBtnState] = useState({
        proBtn: false,
        litBtn: false,
        fireBtn: false,
        topBtn: false
    })

    const [disableState, setDisableState] = useState({
        proBtn: false,
        litBtn: false,
        fireBtn: false,
        topBtn: false
    })

    useEffect(async () => {
        if (props.wallet_address === "") {
            history.push(PUBLIC_PREFIX);
            return notifyError("Please connect your wallet")
        } else {
            setLoading(true);
            removeScrollBar();
            setUserPlan(props.plan);
            showScrollBar();
            setLoading(false);
            showScrollBar();
        }

    }, [props.wallet_address])

    const upgradeProPlan = async () => {
        setBtnState({ ...btnState, proBtn: true })
        setDisableState({ ...disableState, proBtn: true, litBtn: true, fireBtn: true, topBtn: true })
        try {
            const pay = await homeverseioContract.getAccessOfProAccount({ value: ethers.utils.parseEther("0.3") });
            const receipt = await pay.wait();
            if (receipt) {
                upgradePlan(userPlan + 10, "proBtn");
            } else {
                setBtnState({ ...btnState, proBtn: false })
                setDisableState({ ...disableState, proBtn: false, litBtn: false, fireBtn: false, topBtn: false })
            }
        } catch (err) {
            if (err.code === "INSUFFICIENT_FUNDS") {
                notifyError("Insufficient funds");
            }
            setBtnState({ ...btnState, proBtn: false })
            setDisableState({ ...disableState, proBtn: false, litBtn: false, fireBtn: false, topBtn: false })
        }
    }

    const upgradeLitPlan = async () => {
        setBtnState({ ...btnState, litBtn: true })
        setDisableState({ ...disableState, proBtn: true, litBtn: true, fireBtn: true, topBtn: true })
        try {
            const pay = await homeverseioContract.getAccessOfLitAccount({ value: ethers.utils.parseEther("0.5") });
            const receipt = await pay.wait();
            if (receipt) {
                upgradePlan(userPlan + 20, "litBtn");
            } else {
                setBtnState({ ...btnState, litBtn: false })
                setDisableState({ ...disableState, proBtn: false, litBtn: false, fireBtn: false, topBtn: false })
            }
        } catch (err) {
            if (err.code === "INSUFFICIENT_FUNDS") {
                notifyError("Insufficient funds");
            }
            setBtnState({ ...btnState, litBtn: false })
            setDisableState({ ...disableState, proBtn: false, litBtn: false, fireBtn: false, topBtn: false })
        }
    }

    const upgradeFirePlan = async () => {
        setBtnState({ ...btnState, fireBtn: true })
        setDisableState({ ...disableState, proBtn: true, litBtn: true, fireBtn: true, topBtn: true })
        try {
            const pay = await homeverseioContract.getAccessOfFireAccount({ value: ethers.utils.parseEther("0.9") });
            const receipt = await pay.wait();
            if (receipt) {
                upgradePlan(userPlan + 40, "fireBtn");
            } else {
                setBtnState({ ...btnState, fireBtn: false })
                setDisableState({ ...disableState, proBtn: false, litBtn: false, fireBtn: false, topBtn: false })
            }
        } catch (err) {
            if (err.code === "INSUFFICIENT_FUNDS") {
                notifyError("Insufficient funds");
            }
            setBtnState({ ...btnState, fireBtn: false })
            setDisableState({ ...disableState, proBtn: false, litBtn: false, fireBtn: false, topBtn: false })
        }
    }

    const upgradeTopPlan = async () => {
        setBtnState({ ...btnState, topBtn: true })
        setDisableState({ ...disableState, proBtn: true, litBtn: true, fireBtn: true, topBtn: true })
        try {
            const pay = await homeverseioContract.getAccessOfTopAccount({ value: ethers.utils.parseEther("10") });
            const receipt = await pay.wait();
            if (receipt) {
                upgradePlan(444, "topBtn");
            } else {
                setBtnState({ ...btnState, topBtn: false })
                setDisableState({ ...disableState, proBtn: false, litBtn: false, fireBtn: false, topBtn: false })
            }
        } catch (err) {
            if (err.code === "INSUFFICIENT_FUNDS") {
                notifyError("Insufficient funds");
            }
            setBtnState({ ...btnState, topBtn: false })
            setDisableState({ ...disableState, proBtn: false, litBtn: false, fireBtn: false, topBtn: false })
        }
    }

    const upgradePlan = async (plan, btn) => {
        const { updated } = await upgradeUserPlan(props.user_id, plan);
        if (updated) {
            notifySuccess("Success");
            setUserPlan(plan);
            props.setPlan(plan);
        }
        else {
            notifyError("Error Ocurred");
        }
        setBtnState({ ...btnState, [btn]: false })
        setDisableState({ ...disableState, proBtn: false, litBtn: false, fireBtn: false, topBtn: false })
    }

    return (
        <Wrapper>
            {
                loading ? <Loader /> : null
            }
            <Offlaner />
            <Container>
                <Heading className='choose-plan'>
                    Choose your right plan for you
                </Heading>
                <Row className='plan-list'>
                    <PlanList>
                        <li>
                            <CardWrapper>
                                <Heading3>Basic</Heading3>
                                <PlanWrapper bg="#6F4FF2">
                                    <Heading>
                                        3
                                    </Heading>
                                </PlanWrapper>
                                <Heading>Free</Heading>
                                <LoaderButton className="btn-upgrade-plan" text="Your init HVT" />
                            </CardWrapper>
                        </li>
                        <li>
                            <CardWrapper>
                                <Heading3>Pro</Heading3>
                                <PlanWrapper bg="#50BB25">
                                    <Heading>
                                        +10
                                    </Heading>
                                </PlanWrapper>
                                <Heading>0.3 ETH</Heading>
                                <LoaderButton disable={disableState.proBtn} className="btn-upgrade-plan" text={"Purchse 10 HVT"} onClick={upgradeProPlan} loading={btnState.proBtn} />
                            </CardWrapper>
                        </li>
                        <li>
                            <CardWrapper>
                                <Heading3>Lit</Heading3>
                                <PlanWrapper bg="#AAAAAA">
                                    <Heading>
                                        +20
                                    </Heading>
                                </PlanWrapper>
                                <Heading>0.5 ETH</Heading>
                                <LoaderButton disable={disableState.litBtn} className="btn-upgrade-plan" text="Purchase 20 HVT" onClick={upgradeLitPlan} loading={btnState.litBtn} />
                            </CardWrapper>
                        </li>
                        <li>
                            <CardWrapper>
                                <Heading3>Fire</Heading3>
                                <PlanWrapper bg="#DC3546">
                                    <Heading>
                                        +40
                                    </Heading>
                                </PlanWrapper>
                                <Heading>0.9 ETH</Heading>
                                <LoaderButton disable={disableState.fireBtn} className="btn-upgrade-plan" text="Purchase 40 HVT" onClick={upgradeFirePlan} loading={btnState.fireBtn} />
                            </CardWrapper>
                        </li>
                        <li>
                            <CardWrapper>
                                <Heading3>Top</Heading3>
                                <PlanWrapper bg="#F9D62C">
                                    <Heading>
                                        oo
                                    </Heading>
                                </PlanWrapper>
                                <Heading>10 ETH</Heading>
                                <LoaderButton disable={disableState.topBtn} className="btn-upgrade-plan" text="Purchase Top" onClick={upgradeTopPlan} loading={btnState.topBtn} />
                            </CardWrapper>
                        </li>
                    </PlanList>
                </Row>
                <Row className='faq'>
                    <TextWrapper>
                        <Heading>
                            Frequently Asked Questions
                        </Heading>
                        <FaqList>
                            <li>
                                <Heading3>What is HVT ?</Heading3>
                                <Text>
                                    HVT is an abbreviation of HomeVerse Token and is the unit used in our platform.
                                    HVT indicates the number of paid videos that can be uploaded.
                                    Homeverse Token will be released in the future
                                    In the future, you can use Homeverse Token as a currency unit on the platform.
                                    For more detailed plans for the future, please visit our Help page
                                </Text>
                            </li>
                            <li>
                                <Heading3>How do transactions between users work?</Heading3>
                                <Text>
                                    Transactions between users are made by user-to-user wallet-to-wallet.
                                    As there is no need to deposit funds into an account like other platforms, the safety of fund security is guaranteed.
                                    The platform fee is 20%, and if someone buys your video, 80% of the funds go into your wallet.
                                </Text>
                            </li>
                            <li>
                                <Heading3>How do I get HVT Badges and Medals?</Heading3>
                                <Text>
                                    HVT Badge is received according to the number of HVTs, and HVT Medal is received when many Follows are received.
                                    Each time a user receives a follow, the account rate increases.
                                    A reward function will come out in the future, and you can receive a reward according to the account rate.
                                </Text>
                            </li>
                        </FaqList>
                    </TextWrapper>
                </Row>
            </Container>
        </Wrapper>
    )
}

const mapStateToProps = state => {
    return {
        user_id: state.userState.user_id,
        plan: state.userState.plan
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setPlan: (data) => dispatch(setplan(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UpgradePlanPage);

