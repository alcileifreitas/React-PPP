import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    }

    body {
        background: #4169E1;
        font-size: 14px;
        color: #333;
        font-family: sans-serif;
    }

    input{
        font-size: 28px;
        width: 100%;
        margin-left: 10px;
    }
`;