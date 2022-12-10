import styled from 'styled-components';

export const Wrapper = styled.div`
    background-color:#141517;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-family: Montserrat;
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    z-index: 8;
    padding: 50px 20px;
    overflow: auto;
    video{
        width: 100vw;
        height: 100vh;
        position: fixed;
        object-fit: cover;
    }
    .article-container{
        position: relative;
        padding: 20px 30px;
        padding-bottom: 40px;
        z-index: 8;
        max-height: 810px;
        overflow: auto;
        background-color: rgba(0,0,0,.3);
        color: white;
        border-radius: 20px;
        
        &::-webkit-scrollbar {
            width: 5px;
        }

        &::-webkit-scrollbar-button{
            height: 15px;
        }

        &::-webkit-scrollbar-track {
        background: rgba(0,0,0,0); 
        border-radius: 50px;
        }
        
        &::-webkit-scrollbar-thumb {
        border-radius: 50px;
        background: rgba(0,0,0,.3); 
        }

        &::-webkit-scrollbar-thumb:hover {
        background: #555; 
        }
        .main-article{
            flex-direction: column;
        }
        .meta-info-wrapper{
            align-items: center;
            justify-content: space-between;
            padding-top: 30px;
            gap: 30px;
            img{
                max-width: 40px;
            }
            .keyword-wrapper{
                gap: 10px;
            }
        }
        .reply-wrapper{
            width: 100%;
            .your-answer{
                font-size: 20px;
                margin: 0px;
                padding-top: 30px;
                padding-bottom: 10px;
            }
        }
        .button-wrapper{
            gap: 30px;
            padding-top: 30px;
            button{
                max-width: 200px;
            }
        }
        .reviews-heading{
            padding-top: 10px;
        }
        .user-card-info-wrapper {
            background-color: rgba(0,0,0,.3);
            padding: 10px;
            border-radius: 10px;
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 10px;
            color: white;
        }
    }
`


export const Heading = styled.h1`
    color: white;
`
export const Text = styled.div`
    line-height: 24px;
    color: #CACACA;
`

export const KeywordWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-family: Montserrat;
    gap: 10px;
    .keyword{
        color: #F5A623;
    }
    font-weight: 600;
    background-color: rgba(0,0,0,.3);
    padding: 5px 10px;
    border-radius: 5px;
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.25);
`

export const BlogList = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: column;
    padding: 0px;
    gap: 30px;
    .review-card{
        align-items: flex-start;
        justify-content: space-between;
        gap: 30px;
        img{
            max-width: 40px;
        }
    }
    li{
        border-bottom: .2px solid #4D4D4D;
        padding-bottom: 30px;
    }
`

export const ReviewWrapper = styled.div`
    max-width: 1450px;
    line-height: 24px;
    color: #CACACA;
`