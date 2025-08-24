import styled from "styled-components";

const Father = styled.div`
  display: flex;
`;

const BoxOne = styled.div`
  background-color: teal;
  height: 100px;
  width: 100px;
`;

const BoxTwo = styled.div`
  background-color: tomato;
  height: 100px;
  width: 100px;
`;

const Text = styled.span`
  color:white;
`;

function App() {
  return ( 
  <Father>
   <BoxOne>
    <Text>Hello</Text>
   </BoxOne>
   <BoxTwo />
  </Father>
  );
}

export default App;
