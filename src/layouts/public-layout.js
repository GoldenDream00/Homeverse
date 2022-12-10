import Header from "components/header";
import Footer from "components/footer";
import PublicPage from "views/public";
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';

export default function PublicLayout() {
    return (
        <>
            <Header />
            <Content>
                <PublicPage />
                <ToastContainer />
            </Content>
            <Footer />
        </>
    )
}

const Content = styled.section`
    position: relative;
`