import styled from 'styled-components';

export const TextWrapper = styled.div`
    line-height: 32px;
    padding-bottom: 30px;
    max-width: 447px;
`

export const Wrapper = styled.div`
    min-height:80.3vh;
    background-color:#141517;
    display:flex;
    flex-direction:row;
    justify-content:center;
    padding-top:20px;
    .video-upload-label{
        font-size:32px;
        img{
            max-width: 100%;
        }
    }
    .uploaded-image{
        border-radius:20px;
    }
    .heading-wrapper {
        align-items:center;
        justify-content:flex-end;
        .btn-upload-video{
            max-width:200px;
        }
    }
    .upload-tab{
        max-height:fit-content !important;
    }
    .react-tabs__tab-panel{
        max-height:570px;
        min-height:570px;
        padding-left:30px;
        padding-right:30px;
    }
    #img-for-crop{
        border-radius:10px;
    }
`
export const ImageLabel = styled.label`
    font-family:Poppins;
    width:250px;
    height:250px;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    color:white;
    cursor:pointer;
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='20' ry='20' stroke='%23333' stroke-width='7' stroke-dasharray='6%2c 14' stroke-dashoffset='20' stroke-linecap='square'/%3e%3c/svg%3e");
    border-radius: 20px;
    img{
        max-width: 60px;
    }
`
export const UploadContentWrapper = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    gap:50px;
    img{
        border-radius:20px;
        object-fit:cover;
    }
`
export const FileInfoWrapper = styled.div`
    font-family:Poppins;
    color:white;
    p {
        text-overflow: ellipsis; 
        overflow: hidden;
        white-space: nowrap;
        max-width: 240px;
    }
    @media screen and (max-width:560px) {
        display: none;
    }
`
export const TabWrapper = styled.div`
    display:flex;
    flex-direction:row;
    gap:50px;
    flex-wrap:wrap;
    padding-bottom:30px;
`
export const ContractInfoWrapper = styled.div`
    display:flex;
    flex-direction:column;
    gap:20px;
`

export const InfoLabel = styled.div`
    display: flex;
    flex-direction: column;

`
export const Label = styled.label`
    color:white;
    font-family:Montserrat;
    font-weight:bold;
    text-transform:uppercase;
    margin-left:10px;
`
export const InfoContent = styled.div`
    color:white;
    background-color:#141517;
    font-size:16px;
    font-family:Montserrat;
    padding:12px;
    border-radius:10px;
    margin-top:10px;
    padding-left:20px;
    img{
        max-width:20px;
    }
    display:flex;
    flex-direction:row;
    align-items:center;
    gap:5px;
`