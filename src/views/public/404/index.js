import { SharedImage } from 'constants/image-constant';
import NotFoundImage from 'components/image-wrapper';
import { Container, Row } from 'components/layout';
import Button from 'components/button';
import { PUBLIC_PREFIX } from 'configs/app-config';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loader from 'components/loader';
import Offlaner from 'components/offlaner';
import { checkAssetLoading } from 'utilities';
import { Wrapper, Text, TextWrapper, Heading } from './style';

const { Notfound } = SharedImage;

export default function NotFoundPage() {

    const history = useHistory();
    const [loading, setLoading] = useState(true);

    useEffect( async () => {
        const assetsLoading = await checkAssetLoading(Notfound)
        if(assetsLoading){
            setLoading(false);
        }
    }, [])

    return (
        <Wrapper>
            {
                loading ? <Loader/> : null
            }
            <Offlaner/>
            <Container className='container'>
                <Row className='contain-row'>
                    <NotFoundImage src={Notfound} />
                    <TextWrapper>
                        <Heading>404</Heading>
                        <Heading className='heading-2'>
                            Content could not be found
                        </Heading>
                        <Text>
                            You can either stay and chill here, or go back to the beginning.
                        </Text>
                        <Button onClick={() => history.push({pathname: PUBLIC_PREFIX }) } text="BACK TO HOME" />
                    </TextWrapper>
                </Row>
            </Container>
        </Wrapper>
    )
}

