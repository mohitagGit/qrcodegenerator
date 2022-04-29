import './App.css';
import { QRCode } from 'react-qrcode-logo';
import { useEffect, useState } from 'react';
import axios from 'axios';


function App() {
  const[employees, setEmployees] = useState([]);
  const[stringForQrCode, setStringForQrCode] = useState();

  const fnCheckEnterEvent = (event) => {
    if(event && event.charCode === 13){
      createQrCode();
    }
  }

  const createQrCode = () => {
    let newString = document.getElementById("elQRcodeString").value;
    if(newString){
      if(typeof parseInt(newString) === "number" && isNaN(newString) === false){
        let pJsonData = employees.filter(iData => {
          return iData.id === parseInt(newString)
        })
        if(pJsonData.length){
          let jsonDataForQr = JSON.stringify(pJsonData);
          setStringForQrCode(jsonDataForQr);
        }
        else{
          alert("Invalid Employee id");
        }
      }
      else{
        alert("Enter valid employee id")
      }
    }
    else{
      setStringForQrCode("");
      alert("Please Enter the employee id");
    }
  }

  // const createQrCode = () => {
  //   let newString = document.getElementById("elQRcodeString").value;
  //   if(newString){
  //     setStringForQrCode(newString);
  //   }
  //   else{
  //     setStringForQrCode("");
  //     alert("Please Enter the link");
  //     console.log(employees);
  //   }
  // }

  const getEmployeesData = () => {
    axios.get("http://dummy.restapiexample.com/api/v1/employees")
    .then(result => {
      if(result && result.status === 200 && result.data && result.data.data){
        setEmployees(result.data.data);
      }
    })
    .catch(error =>{
      console.log("Error",error)
    })
  }

  useEffect(()=>{
    getEmployeesData();
  },[]);
  return (
    <div className="App">
      <header className="App-header">
        <h3>Create your QR Code</h3><br/>
        <p><code>{stringForQrCode}</code></p>
        {/* <p><button onClick={()=>getEmployeesData()}>Get Employees Data</button></p> */}
        <div className="row">
          <input type="text" onKeyPress={fnCheckEnterEvent} placeholder="Enter your link or data" id="elQRcodeString" name="elQRcodeString"></input>
          <span><button className='btn' onClick={()=>createQrCode()}>Create QR</button></span>  
        </div>
        <input accept="image/*" id="icon-button-file" type="file" capture="environment"/>
        {
          stringForQrCode?
          <>
          <p><QRCode value={stringForQrCode}></QRCode></p>
          <h4>scan above <code>QR codes</code> for result.</h4>
          </>
          :null
        }
        {
          employees.map(iEmployee => {
            return (
              <ul key={iEmployee.id} className="employee-list">
                <li>Id: {iEmployee.id}</li>
                <li>Name: {iEmployee.employee_name}</li>
              </ul>
            )
          })
        }
        <br/>
        <br/>
        <br/>
        <p><a
          className="App-link"
          href="https://liquidstudio.nl/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Liquid Studio
        </a></p>
      </header>
    </div>
  );
}

export default App;