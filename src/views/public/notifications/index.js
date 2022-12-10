import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { clearMessages, getAllMessages } from "actions/msg-mg";
import Loader from "components/loader";
import { Container, Row } from "components/layout";
import { cleared } from 'store/actions/action';
import Offlaner from "components/offlaner";
import { Wrapper, TableWrapper } from './style';
import { Table, Td, Th, Tr } from 'components/table';
import { notifyError, removeScrollBar, showScrollBar, start_and_end } from "utilities";
import { useHistory } from "react-router-dom";
import { PUBLIC_PREFIX } from "configs/app-config";

function NotifyPage(props) {

    const [notifyList, setNotifyList] = useState([]);
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    useEffect(async () => {
        removeScrollBar();
        setLoading(true);
        if (props.wallet_address !== "") {
            const { allMsgs } = await getAllMessages(props.wallet_address);
            setNotifyList([...allMsgs]);

            new Promise((resolve, reject) => {
                allMsgs.map((item, key) => {
                    resolve(clearMessages(item.id))
                })
            })

            props.isCleared();

            setLoading(false);
        } else {
            history.push(PUBLIC_PREFIX)
            return notifyError("Please connect your wallet")
        }
        showScrollBar();
    }, [props.wallet_address])

    return (
        <Wrapper>
            {
                loading ? <Loader /> : null
            }
            <Offlaner />
            <Container className="container">
                <TableWrapper>
                    {
                        notifyList.length !== 0 ? <Table>
                            <thead>
                                <Tr>
                                    <Th>ID</Th>
                                    <Th>Buyer</Th>
                                    <Th>Video</Th>
                                    <Th>Price</Th>
                                    <Th>Date</Th>
                                    <Th>Message</Th>
                                </Tr>
                            </thead>
                            <tbody>
                                {
                                    notifyList.map((item, key) => {
                                        return (
                                            <Tr key={key + 1}>
                                                <Td>{key + 1}</Td>
                                                <Td>{start_and_end(item.data.buyer)}</Td>
                                                <Td>{item.data.title}</Td>
                                                <Td>{item.data.price}</Td>
                                                <Td>{item.data.date}</Td>
                                                <Td>{item.data.type ? "Someone Followed your video" : "Someone purchased your video"}</Td>
                                            </Tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table> : "There is no messages"
                    }
                </TableWrapper>
            </Container>
        </Wrapper>
    )
}

const mapStateToProps = state => {
    return {
        wallet_address: state.walletState.wallet_address
    }
}


const mapDispatchToProps = dispatch => {
    return {
        isCleared: () => dispatch(cleared())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotifyPage);