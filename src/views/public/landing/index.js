import { Container, Row } from 'components/layout';
import LandingImage from 'components/image-wrapper';
import { SharedImage } from 'constants/image-constant';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { checkAssetLoading } from 'utilities';
import Loader from 'components/loader';
import Overlay from 'components/overlay';
import Offlaner from 'components/offlaner';
import { Wrapper, Text, TextWrapper, Heading, ImageWrapper } from './style';
import { Link } from 'react-router-dom';
import { PUBLIC_PREFIX, MOVIE_LIST_PREFIX } from 'configs/app-config';

const { Landing, Course } = SharedImage;

function LandingPage(props) {
    const [isConnect, setConnect] = useState(0);
    const { wallet__state } = props;
    const [loading, setLoading] = useState(true);

    useEffect(async () => {
        setConnect(wallet__state);
        const bg = await checkAssetLoading(Landing);
        const course = await checkAssetLoading(Course);
        if(props.timer) {
            clearInterval(props.timer);
        }
        if(bg && course) {
            setLoading(false);
        }

    }, [wallet__state])

    return (
        <Wrapper landing={Landing} >
            <Overlay />
            {
                loading ? <Loader /> : null
            }
            <Offlaner />
            <Container>
                <Row className='content-row'>
                    <TextWrapper>
                        <Heading>Welcome to Homeverse.io </Heading>
                        <Text>
                            Homeverseio is a platform with various functions such as Video Upload, Marketplace, Blog, Influence etc.
                        </Text>
                        <Link to={ PUBLIC_PREFIX + MOVIE_LIST_PREFIX }>
                            Explore Videos Now
                        </Link>
                    </TextWrapper>
                    <ImageWrapper>
                        <LandingImage src={Course} alt="course" />
                    </ImageWrapper>
                </Row>
            </Container>
        </Wrapper>

    )
}

const mapStateToProps = state => {
    return {
        wallet__state: state.walletState.wallet_state,
        timer:state.dataState.timer
    }
}

export default connect(mapStateToProps)(LandingPage)