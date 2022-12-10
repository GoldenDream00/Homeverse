import { Offline } from "react-detect-offline";
import Loader from "./loader";
import { removeScrollBar, showScrollBar } from "utilities";

export default function Offlaner() {

    const testFunc = (flag) => {
        if(flag) {
            showScrollBar();
        }
        else {
            removeScrollBar();
        }
    }

    return (
        <Offline onChange={(flag) => testFunc(flag) }>
            <Loader />
        </Offline>
    )
}