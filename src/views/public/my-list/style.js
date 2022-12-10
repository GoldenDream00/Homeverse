import styled from 'styled-components';

export const Wrapper = styled.section`
    min-height:810px;
    display:flex;
    flex-direction:column;
    align-items: center;
    background-color:#141517;
    color:white;
    font-family: Montserrat;
    .container{
        display:flex;
        flex-direction:row;
        justify-content: center;
        gap: 50px;
        padding-bottom: 50px;
        @media screen and (max-width:1400px){
            flex-direction: column;
            align-items: center;
            gap: 0px;
        }
        .avatar{
            max-width:150px;
            cursor: pointer;
            border-radius: 50%;
            border: 5px solid white;
        }
    }
    .profile-wrapper{
        flex-direction:column;
        align-items:center;
        gap:30px;
        border-radius:20px;
        width:100%;
        max-width: 350px;
        padding-bottom: 50px;
        transform: translateY(-90px);
        @media screen and (max-width:1400px){
            padding-bottom: 0px;
        }

    }
    .link{
        color:white;
        text-decoration:none;
    }
    .profile-button-wrapper{
        gap: 20px;
        flex-direction: column;
        align-items: center;
        flex: 1;
        width: 100%;
        a{
            width: 100%;
            border: none;
            background-color: #141414;
            color: white;
            padding: 15px 0px;
            font-size: 14px;
            border-radius: 50px;
            font-family: Montserrat;
            font-weight: 600;
            text-align: center;
            background-color: rgba(0,0,0,0.3);
            cursor: pointer;
            &:hover{
                background-color: #323232;
            }
            @media screen and (max-width:390px){
                max-width: 250px;
            }
        }
    }
`

export const Heading = styled.h1`
`

export const MetaWrapper = styled.div`
    display:flex;
    flex-direction:column;
    gap:30px;
    align-items:center;
    width: 100%;
    .rate-row{
        align-items: center;
        gap: 5px;
    }
    .info-wrapper{
        justify-content: space-between;
        width: 90%;
    }
    .badge-content{
        width: 95%;
        flex-direction: column;
        .badge-wrapper{
        justify-content: flex-start;
        width: 100%;
        gap: 25px;
        align-items: center;
        img{
            max-width: 90px;
        }
        }
    }
`
export const ContentWrapper = styled.div`
    display:flex;
    flex-direction:column;
    padding-top: 30px;
    width: 100%;
    @media screen and (max-width:1720px) {
        max-width: 955px;
    }
    @media screen and (max-width:1400px){
        transform: translateY(-90px);
    }
    @media screen and (max-width:1020px){
        max-width: 620px;
    }
    @media screen and (max-width:620px){
            align-items: center;
    }
    .type-menu-wrapper{
        overflow: auto;
        max-width: 100%;
    }
`
export const TypeMenu = styled.ul`
    display: flex;
    flex-direction: row;
    align-items: center;
    list-style: none;
    padding: 0px;
    gap:10px;
    overflow: auto;

    li{
        font-weight: medium;
        cursor: pointer;
        a{
            color: white;
            text-decoration: none;
        }
    }
    .active-type{
        background-color:rgba(0,0,0,.3);
        font-weight: 600;
        border: .5px solid #323232;
    }
    .list-type-item{
        padding: 10px 20px;
        border-radius: 50px;
    }
`

export const CourseList = styled.ul`
    padding:0px;
    margin:0px;
    display:flex;
    flex-direction:row;
    flex-flow:wrap;
    list-style:none;
    flex:1;
    padding-top: 30px;
    .infinite-scroll-component{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap:39px;
        @media screen and (max-width:670px){
            justify-content: center !important;
        }
    }

`

export const BannerSection = styled.div`
    background-image: url(${props => props.bg});
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 200px;
    position: relative;
    background-size: cover;
    background-position: center;
`
export const TypeWrapper = styled.div`
    border: .5px solid transparent;
    white-space: nowrap;
    &:hover{
        border: .5px solid #323232;
    }
`