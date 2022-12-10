import styled from 'styled-components';

export const Wrapper = styled.div`
background-color:#141517;
color:white;
display:flex;
flex-direction:row;
justify-content:center;
padding-top:80px;
min-height:730px;
.container{
    display:flex;
    flex-direction:column;
    align-items: center;
    gap: 50px;
}
.content-wrapper{
    gap:35px;
    align-items: flex-start;
    padding: 0px 20px;
}
`
export const MainContent = styled.div`
display:flex;
flex-direction:row;
flex-flow:wrap;
justify-content:center;
flex:1;
width: 100%;
`
export const CourseList = styled.ul`
list-style:none;
padding:0px;
margin:0px;
display:flex;
flex-direction:row;
flex-flow:wrap;
padding-bottom:50px;
gap:46px;
@media screen and (max-width:1640px) {
        max-width: 1300px;
    }
    @media screen and (max-width:1300px) {
        max-width: 970px;
    }
    @media screen and (max-width:980px) {
        max-width: 630px;
    }
    @media screen and (max-width:640px) {
        max-width: 290px;
    }
li{
    .link{
        color:white;
        text-decoration:none;
    }
}

.infinite-scroll-component{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap:46px;
    max-width: 1640px;
    @media screen and (max-width:1640px) {
        max-width: 1300px;
    }
    @media screen and (max-width:1300px) {
        max-width: 970px;
    }
    @media screen and (max-width:980px) {
        max-width: 630px;
    }
    @media screen and (max-width:640px) {
        max-width: 290px;
    }
}
`

export const SearchForm = styled.div`
width:100%;
border-radius:15px;
display:flex;
flex-direction:column;
align-items: center;
gap:10px;
.search-input{
    background-color: rgba(0,0,0,.3);
    height: 50px;
    border-radius: 100px;
    width: 100%;
    max-width: 640px;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    input{
        background-color: transparent;
        margin-top: 0px;
        border-radius: 100px;
    }   
}
.criteria-search{
    width: 100%;
    max-width: 640px;
    justify-content: space-between;
    @media screen and (max-width:640px ){
        flex-direction: column;
        width: 100%;
    }
    .criteria-select-box{
        background-color: rgba(0,0,0,.3);
        height: 50px;
    }
}
`
export const SearchButton = styled.button`
    background-color:#323232;
    border:none;
    color:white;
    font-family:Montserrat;
    height: 90%;
    border-radius:10px;
    cursor:pointer;
    width: 100%;
    max-width: 150px;
    border-radius: 100px;
    position: absolute;
    right: 0px;
    &:hover{
            background-color: #5C5C5C;
    }
`
export const Heading = styled.h1`
`

export const NoDataWrapper = styled.div`
    display: flex;
    font-family: Montserrat;
    padding-top: 50px;
    flex-direction: column;
    align-items: center;
    .search-icon{
        font-size: 60px;
        transform: translateX(-5px);
    }
`

export const Text = styled.div`
    text-align: center;
`