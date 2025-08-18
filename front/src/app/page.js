"use client";
import { useState } from "react";
import axios from "axios";

function App() {
  const [policies, setPolicies] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


  const [name, setName] = useState("");
  const [srcintf, setSrcintf] = useState("");
  const [dstintf, setDstintf] = useState("");
  const [srcaddr, setSrcaddr] = useState("");
  const [dstaddr, setDstaddr] = useState("");


  const ipRegex =
    /^(25[0-5]|2[0-4]\d|[01]?\d?\d)(\.(25[0-5]|2[0-4]\d|[01]?\d?\d)){3}$/;


  const fetchPolicies = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "http://localhost:8000/api/firewall-policies"
      );

      setPolicies(response.data.results || []);
    } catch (err) {
      console.error("Error fetching policies:", err);
      setError("Error fetching polices");
    } finally {
      setLoading(false);
    }
  };

  
  const importAddresses = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "http://localhost:8000/api/firewall-addresses"
      );

      setAddresses(response.data.results || []);
    } catch (err) {
      console.error("Error importing addresses:", err);
      setError("Error fetching addresses");
    } finally {
      setLoading(false);
    }
  };


  const createPolicy = async (e) => {
    e.preventDefault();


    if (srcaddr && !ipRegex.test(srcaddr)) {
      alert("Source address wrong. Формат: x.x.x.x");
      return;
    }
    if (dstaddr && !ipRegex.test(dstaddr)) {
      alert("Ip type error. Формат: x.x.x.x");
      return;
    }


    const newPolicy = {
      name,
      srcintf: srcintf ? [{ name: srcintf }] : [],
      dstintf: dstintf ? [{ name: dstintf }] : [],
      srcaddr: srcaddr ? [{ name: srcaddr }] : [],
      dstaddr: dstaddr ? [{ name: dstaddr }] : [],

    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/firewall-policies",
        newPolicy
      );
      alert("Success creating policy");

      fetchPolicies();

      setName("");
      setSrcintf("");
      setDstintf("");
      setSrcaddr("");
      setDstaddr("");
    } catch (err) {
      console.error("Бодлого үүсгэхэд алдаа гарлаа:", err);
      alert("Бодлого үүсгэхэд алдаа гарлаа");
    }
  };


  const deletePolicy = async (policyId) => {
    if (!window.confirm("Энэ бодлогыг устгахдаа итгэлтэй байна уу?")) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:8000/api/firewall-policies/${policyId}`
      );
      alert("Бодлого амжилттай устгагдлаа");

      fetchPolicies();
    } catch (err) {
      console.error("Бодлого устгахад алдаа гарлаа:", err);
      alert("Бодлого устгахад алдаа гарлаа");
    }
  };

  return (
    <div className="w-screen p-4">
      <h1 className="text-2xl font-bold mb-4">
        FortiGate policy management
      </h1>

      <div className="mb-8 p-4 border rounded bg-gray-100">
        <h2 className="text-xl font-semibold mb-2">Create policy</h2>
        <form onSubmit={createPolicy} className="flex flex-col gap-4">
          <div>
            <label>Name: </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-1"
              required
            />
          </div>
          <div>
            <label>Source interface (srcintf): </label>
            <input
              type="text"
              value={srcintf}
              onChange={(e) => setSrcintf(e.target.value)}
              className="border p-1"
            />
          </div>
          <div>
            <label>Destination address (dstintf): </label>
            <input
              type="text"
              value={dstintf}
              onChange={(e) => setDstintf(e.target.value)}
              className="border p-1"
            />
          </div>
          <div>
            <label>Source address (srcaddr): </label>
            <input
              type="text"
              value={srcaddr}
              onChange={(e) => setSrcaddr(e.target.value)}
              className="border p-1"
              placeholder="192.168.1.1"
            />
          </div>
          <div>
            <label>Destination address (dstaddr): </label>
            <input
              type="text"
              value={dstaddr}
              onChange={(e) => setDstaddr(e.target.value)}
              className="border p-1"
              placeholder="10.0.0.1"
            />
          </div>
          <button
            type="submit"
            className="mt-2 bg-green-500 text-white p-2 rounded"
          >
            Бодлого үүсгэх
          </button>
        </form>
      </div>


      <div className="mb-4 flex gap-4">
        <button
          onClick={fetchPolicies}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Fetch policies
        </button>
        <button
          onClick={importAddresses}
          className="bg-purple-500 text-white p-2 rounded"
        >
          Fetch addresses
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* List of policies */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Policies</h2>
        {policies.length > 0
          ? policies.map((policy, index) => (
              <div
                key={index}
                className="flex flex-col border p-2 mb-2 bg-blue-100"
              >
                <div>
                  <strong>:</strong> {policy.policyid || "N/A"}
                </div>
                <div>
                  <strong>Нэр:</strong> {policy.name}
                </div>
                <div className="flex gap-4 mt-2">
                  <button
                    onClick={() => deletePolicy(policy.policyid)}
                    className="bg-red-500 text-white p-1 rounded"
                  >
                    Устгах
                  </button>
                </div>
              </div>
            ))
          : !loading && <p>Бодлого олдсонгүй</p>}
      </div>

      {/* List of imported addresses */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Импортлогдсон хаягууд</h2>
        {addresses.length > 0
          ? addresses.map((addr, index) => (
              <div
                key={index}
                className="flex flex-col border p-2 mb-2 bg-green-100"
              >
                <div>
                  <strong>Хаягын дугаар:</strong> {addr.addrid || "N/A"}
                </div>
                <div>
                  <strong>Нэр:</strong> {addr.name}
                </div>
                <div>
                  <strong>Хаяг:</strong> {addr.subnet || addr.ip || "N/A"}
                </div>
              </div>
            ))
          : !loading && <p>Хаяг олдсонгүй</p>}
      </div>
    </div>
  );
}

export default App;
