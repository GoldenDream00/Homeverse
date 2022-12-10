import SweetAlert from 'react-bootstrap-sweetalert';

export default function Alert ({customButtons, onConfirm, onCancel, Show, Style, Custom, ShowCloseButton, ShowCancel, ConfirmBtnText, CancelBtnText, CustomIcon, Title, Warning, Success, Text}) {
    return(
        <SweetAlert
                success={Success}
                warning={Warning}
                custom={Custom}
                showCancel={ShowCancel}
                showCloseButton={ShowCloseButton}
                confirmBtnText={ConfirmBtnText}
                cancelBtnText={CancelBtnText}
                customIcon={CustomIcon}
                title={Title}
                onConfirm={onConfirm}
                onCancel={onCancel}
                show={Show}
                style={Style}
                customButtons={customButtons}
            >
                {
                    Text
                }
            </SweetAlert>
    )
}