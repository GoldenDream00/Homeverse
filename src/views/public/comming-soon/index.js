import { SharedImage } from 'constants/image-constant';
import Image from 'components/image-wrapper';
import { useHistory } from 'react-router-dom';
import { PUBLIC_PREFIX, MOVIE_LIST_PREFIX } from 'configs/app-config';
import { useLocation } from 'react-router-dom';
import { removeScrollBar } from 'utilities';
import Offlaner from 'components/offlaner';
import { Wrapper, Heading,TextWrapper, BrowseMoreButton } from './style';

const { BUBBLE } = SharedImage;

export default function CommingSoonPage() {

    const history = useHistory();
    const location = useLocation();

    const toExplorePage = () => {
        removeScrollBar();
        history.push(PUBLIC_PREFIX+MOVIE_LIST_PREFIX);
    }

    return (
        <Wrapper>
            <Offlaner/>
            <Image src={BUBBLE} className='bubble' />
            <Image src={BUBBLE} className='bubble-2' />
            <Image src={BUBBLE} className='bubble-3' />
            <Image src={BUBBLE} className='bubble-4' />
                <Heading>
                    Comming Soon
                </Heading>
                <TextWrapper>
                    {
                        location.state.data
                    }
                </TextWrapper>
                <BrowseMoreButton onClick={() => toExplorePage()} className='browse-more'>
                    Browse Videos more
                </BrowseMoreButton>
        </Wrapper>
    )
}
