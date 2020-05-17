import styled from 'styled-components';

export const FlightContainer =styled.div`
        width: 40%;
        height: 90%;
        border: 1px solid rgb(211, 211, 211);
        display: flex;
        flex-direction: column;
        align-content:space-around ;
        margin: 5% 7% 5% 5%;
        font-family: 'Open Sans Condensed';
        font-size: 22px;
        @media screen and (max-width: 800px){
            width: 80%;
            font-size: 16px;
        };
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
        font-size: 20px;
`

export const FlightDetails = styled.div`
        display: grid;
         grid-template-columns: repeat(1,1fr);
         place-content: center center;
         row-gap: 8px;
`

export const FlightButton = styled.div`
        display: none;
        place-self: center center;       
        margin-bottom: 10px;
`

export const FlightDetailsEachComponent =styled.div`
        display: grid;
        grid-template-columns: repeat(2,1fr);
        justify-content: start;

`
