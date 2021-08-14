import React, { Fragment, useState } from "react";

export default function EditSub ({ entry }) {
    const [data, setData] = useState({
        sub_name: entry.sub_name,
        phone_no: entry.phone_no,
        date_of_birth: entry.date_of_birth,
        tariff_id: entry.tariff_id,
        area_code: entry.area_code,
        avg_spending: entry.avg_spending,
      });
    
      const onChange = (e) => {
        setData({...data, [e.target.name]: e.target.value});
      };

      //edit update function
      const updateSub = async(e) => {
          e.preventDefault();
          try {
              const body = { data };
              let res = await fetch(`http://localhost:5000/tariffs/${entry.sub_id}`, {
                method:'PUT', 
                headers:{'Content-Type':'application/json'}, 
                body:JSON.stringify(body)
            });
            console.log(res);
          } catch (err) {
              console.error(err.message);
          }
      } 

    const displayModal =
        <Fragment>
            <button type="button" class="btn btn-warning" data-toggle="modal" data-target={`#sub_id${entry.sub_id}`}>Edit</button>

           
            <div id={`sub_id${entry.sub_id}`} class="modal fade" role="dialog">
            <div class="modal-dialog">

               
                <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Edit Subscriber</h4>
                </div>
                <div class="modal-body">
                <form>
                    <label htmlFor="sub_name">Subscriber Name: </label>
                    <br />
                    <input type="text" name="sub_name" value={data.sub_name} onChange={onChange} />
                    <br />
                    <label htmlFor="phone_no" className="mt-3">Phone Number: </label>
                    <br />
                    <input type="text" name="phone_no" value={data.phone_no} onChange={onChange} />
                    <br />
                    <label htmlFor="date_of_birth" className="mt-3">Date of Birth: </label>
                    <br />
                    <input type="integer" name="date_of_birth" value={data.date_of_birth} onChange={onChange} />
                    <br />
                    <label htmlFor="tariff_id" className="mt-3">Tariff ID: </label>
                    <br />
                    <input type="integer" name="tariff_id" value={data.tariff_id} onChange={onChange} />
                    <br />
                    <label htmlFor="area_code" className="mt-3">Area Code: </label>
                    <br />
                    <input type="integer" name="area_code" value={data.area_code} onChange={onChange} />
                    <br />
                    <label htmlFor="avg_spending" className="mt-3">Average Spending: </label>
                    <br />
                    <input type="integer" name="avg_spending" value={data.avg_spending}  onChange={onChange} />
                    <br />
                    
                </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" data-dismiss="modal" onClick={e => updateSub(e)}>Save</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
                </div>
                </div>


            </div>
        </Fragment>
    return(    
        <>
            {displayModal}
        </>
    );
}