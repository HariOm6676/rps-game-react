import React from 'react'

function Test() {
  function clickHandler(){
    console.log('hello');
  }

  const anon = () => { 
    console.log('hello');
  };
  return (
    <div>
      <button onClick={clickHandler}>click me</button>
      <button onClick={
      () => { 
        console.log('hello');
      }
      }>click me</button>
      <button onClick={anon}>click me</button>
    </div>


</div>
  )
}

export default Test