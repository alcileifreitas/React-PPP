import styled from 'styled-components';

const Container = styled.div `
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-top: 5px;
  margin-left: 10px;
  margin-bottom: 10px;
  margin-right: 5px;
  
  .button {
    height: 34px;
    cursor: pointer;
    width: 100%;
    margin-top: 5px;

  }
  }

`;

export const Card = styled.div`
  img {
    width: 250px;
  }
  input {
    width: 320px;
  }
  color: #000;
  font-family: Roboto, Arial, Helvetica, sans-serif;
  display: flex;
  align-content: center;
  justify-content: center;
  width: 360px;
  box-shadow: 0px 4px 8px 0px #4F4F4F;
  border-radius: 5px;
  display: inline-block;
  margin-top: 10px;
  background-color: #fff;
  padding: 8px;
  & {
   margin-right: 10px;
 }
}
`;


export default Container;