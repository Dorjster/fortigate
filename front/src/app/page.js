"use client";
import { useState } from 'react';
import axios from 'axios'; 

function App() {
  const [policies, setPolicies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPolicies = () => {
    setLoading(true);
    setError(null);

    axios.get('http://localhost:8000/api/firewall-policies')
      .then((response) => {
        setPolicies(response.data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching policies:', err);
        setError('Failed to fetch policies');
        setLoading(false);
      });
  };
console.log(policies);

  

  return (
    <div className="w-screen">
      
      <button onClick={fetchPolicies} className="flex ml-[20px] border p-[20px] bg-gray-200 hover:bg-blue-400 mt-[10px]">
        Show Policies
      </button>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div className="mt-[20px] w-screen h-screen">
        {policies.length > 0 ? (
          policies.map((policy, index) => (
            <div key={index} className="w-screen  flex gap-[10px] border mb-[20px] p-[3px]  bg-blue-200  cursor-pointer">
                <div>{policy.policyid}</div>
              <div className="w-fit">{policy.name}</div>
            
              <div>
  {policy.dstaddr && policy.dstaddr.length > 0 ? (
    <div>
      {policy.dstaddr.map((addr, id) => (
        <div key={id} className="flex gap-[20px]">
          <div> {addr.name}</div>
     
     
        </div>
      ))}
    </div>
  ) : null}
</div>
              <div>
  {policy.dstintf && policy.dstintf.length > 0 ? (
    <div>
      {policy.dstaddr.map((addr, id) => (
        <div key={id} className="flex gap-[20px]">
          <div> {addr.name}</div>
       
     
        </div>
      ))}
    </div>
  ) : null}
</div>
              <div>
  {policy.srcaddr && policy.srcaddr.length > 0 ? (
    <div>
      {policy.srcaddr.map((addr, id) => (
        <div key={id} className="flex gap-[20px]">
          <div> {addr.name}</div>
      
     
        </div>
      ))}
    </div>
  ) : null}
</div>
              <div>
  {policy.srcintf && policy.srcintf.length > 0 ? (
    <div>
      {policy.srcintf.map((addr, id) => (
        <div key={id} className="flex gap-[20px]">
          <div> {addr.name}</div>
    
     
        </div>
      ))}
    </div>
  ) : null}
</div>

              
           
            </div>
          ))
        ) : (
          !loading && <p>No policies </p>
        )}
      </div>
    </div>
  );
}

export default App;
