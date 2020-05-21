import styled from 'styled-components';

export const CustumCircle = styled.div`
        border: 20px solid ${({ buttonColor}) => `${buttonColor}`};
        border-radius: 50%;
        width: 10px;
        font-size:16px;
        background-color: ${({ buttonColor}) => `${buttonColor}`};
        display: flex;
        align-items: center;
        cursor: ${({pointerValue})=>`${pointerValue}` };
        font-family:Open Sans Condensed;
        @media screen and (max-width: 800px){
                border: 14px solid ${({ buttonColor}) => `${buttonColor}`};
                font-size:14px;
              }
        @media screen and (max-width: 400px){
                border: 8px solid ${({ buttonColor}) => `${buttonColor}`};
                font-size:12px;
              }
        
`