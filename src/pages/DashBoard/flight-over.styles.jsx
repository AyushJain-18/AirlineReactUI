import styled from 'styled-components';

export const FlightContainer =styled.div`
        width: 80%;
        height: 90%;
        box-shadow: 5px 10px 18px #888888;
        display: flex;
        flex-direction: column;
        align-content:space-around ;
        margin: 0 7% 5% 5%;
        padding-bottom: 2vw;
        font-family: 'Open Sans Condensed';
        &:hover{
            transform: scale(1.1);
            background-color:#eeeeee;
            @media screen and (max-width: 800px){
                background-color: white;
                transform: scale(1);
            }
`

export const FlightName = styled.div`
        display: flex;
        height: 25px;
        flex-direction: row;
        margin: 15px 4px;
        justify-content: center;
        background-color: #c0bdbd;
        border-bottom: 1px solid #aca9a9;
        font-size: 22px;
`

export const FlightDetails = styled.div`
        display: grid;
         grid-template-columns: repeat(3,1fr);
         place-content: center center;
         row-gap: 8px;
         font-size: 20px;
         @media screen and (max-width: 800px){
            grid-template-columns: repeat(2,1fr);
            font-size: 16px;
         }
         @media screen and (max-width: 400px){
            grid-template-columns: repeat(1,1fr);
            font-size: 12px;
         }
`

export const FlightButton = styled.div`
        place-self: center center;       
        margin-bottom: 10px;
    
        @media screen and (max-width: 800px){
            grid-column: span 2;
            }
        @media screen and (max-width: 400px){
            grid-column: span 1;
        }
`

export const FlightDetailsEachComponent =styled.div`
        display: block;
`