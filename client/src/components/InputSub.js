import React, {useState} from 'react';

export default function InputSub(){
  const [data, setData] = useState({
    sub_name:"",
    phone_no:"",
    date_of_birth:"",
    tariff_id:"",
    area_code:"",
    avg_spending:"",
  });

  const onChange = (event) => {
    setData({...data, [event.target.name]: event.target.value});
  };
  
  const onSubmit = async (event) => {
    event.preventDefault();
    const {sub_name, phone_no, date_of_birth, tariff_id, area_code, avg_spending} = data;
    let res = await fetch('http://localhost:5000/tariffs', {
                method:'POST', 
                headers:{'Content-Type':'application/json'}, 
                body:JSON.stringify({token:localStorage.getItem('token'), sub_name, phone_no, date_of_birth, tariff_id, area_code, avg_spending})
            });
    res = await res.json();
    setData({...data, msg:res.msg, sub_name:"", phone_no:"", date_of_birth:"", tariff_id:"", area_code:"", avg_spending:""});
    window.location = "/" ;
  }

  const result = (data.msg) ? (<p>{data.msg}</p>) : null;

  return(
    <div className="form text-center mt-5">
      <h1 className="form text-center mt-5">New Subscriber</h1>
      <form className="mt-5" onSubmit={onSubmit}>
        <label htmlFor="sub_name">Subscriber Name: </label>
        <br />
        <input type="text" name="sub_name" value={data.sub_name} onChange={onChange} placeholder="Enter Name" required />
        <br />
        <label htmlFor="phone_no" className="mt-3">Phone Number: </label>
        <br />
        <input type="text" name="phone_no" value={data.phone_no} onChange={onChange} placeholder="Enter Phone Number" required />
        <br />
        <label htmlFor="date_of_birth" className="mt-3">Date of Birth: </label>
        <br />
        <input type="integer" name="date_of_birth" value={data.date_of_birth} onChange={onChange} placeholder="YYYY-MM-DD" />
        <br />
        <label htmlFor="tariff_id" className="mt-3">Tariff ID: </label>
        <br />
        <input type="integer" name="tariff_id" value={data.tariff_id} onChange={onChange} placeholder="Enter Tariff ID" />
        <br />
        <label htmlFor="area_code" className="mt-3">Area Code: </label>
        <br />
        <input type="integer" name="area_code" value={data.area_code} onChange={onChange} placeholder="Enter Area Code" />
        <br />
        <label htmlFor="avg_spending" className="mt-3">Average Spending: </label>
        <br />
        <input type="integer" name="avg_spending" value={data.avg_spending} onChange={onChange} placeholder="Enter Average Spending" />
        <br />
        <br />
        <input className="page-btn btn btn-success" type="submit" value="Submit" />
        {result}
      </form>
    </div>
  );
}