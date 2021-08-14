import React, { Fragment, useEffect, useState } from "react";
import EditSub from "./EditSub";

export default function ListSubs () {
    const [entry, setEntry] = useState([]);

    //delete subscriber function
    const deleteSub = async sub_id => {
        try {
            let deleteSub = await fetch(`http://localhost:5000/tariffs/${sub_id}`, {
                method:'DELETE'
            });

            setEntry(entry.filter(entry => entry.sub_id !== sub_id));
        } catch (err) {
            console.log(err.message);
        }
    }
    
        const fetchEntry = async () => {
            try {
                let res = await fetch('http://localhost:5000/tariffs');
                let data = await res.json();
                
                setEntry(data);
            } catch (err) {
                console.error(err.message);
            };
       
        };
        
        useEffect(() => {
        fetchEntry();
        }, []);

    const displayEntry = 
        <div className="mt-5">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Subscriber ID</th>
                        <th>Subscribe Name</th>
                        <th>Phone Number</th>
                        <th>Age</th>
                        <th>Tariff ID</th>
                        <th>Area Code</th>
                        <th>Average Spending</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {entry.map(entry => (
                        <tr key={entry.sub_id}>
                        <td>{entry.sub_id}</td>
                        <td>{entry.sub_name}</td>
                        <td>{entry.phone_no}</td>
                        <td>{entry.date_of_birth}</td>
                        <td>{entry.tariff_id}</td>
                        <td>{entry.area_code}</td>
                        <td>{entry.avg_spending}</td>
                        <td><EditSub entry={entry} /></td>
                        <td>
                            <button className="btn btn-danger" onClick={() => deleteSub(entry.sub_id)}>Delete</button>
                        </td>
                    </tr>
                    ))}

                </tbody>
            </table>
        </div>

    return(
        <>
        <h1 className="text-center mt-5"> List of Subscribers</h1>
        {displayEntry}
        </>
    );
    }