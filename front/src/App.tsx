import * as React from 'react';
import AppBar from './Home/AppBar';



export default function main() {

  window.onload = function(){
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
  }


  return (

        <AppBar></AppBar>       
  );
}
