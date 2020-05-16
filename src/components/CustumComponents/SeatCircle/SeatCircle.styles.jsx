import styled from 'styled-components';

export const CustumCircle = styled.div`
        border: 20px solid ${({ buttonColor}) => `${buttonColor}`};
        border-radius: 50%;
        width: 10px;
        background-color: ${({ buttonColor}) => `${buttonColor}`};
        display: flex;
        align-items: center;
`