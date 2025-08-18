// "use client";
// import { useState } from "react";
// import axios from "axios";

// function App() {
//   const [policies, setPolicies] = useState([]);
//   const [addresses, setAddresses] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);


//   const [name, setName] = useState("");
//   const [srcintf, setSrcintf] = useState("");
//   const [dstintf, setDstintf] = useState("");
//   const [srcaddr, setSrcaddr] = useState("");
//   const [dstaddr, setDstaddr] = useState("");


//   const ipRegex =
//     /^(25[0-5]|2[0-4]\d|[01]?\d?\d)(\.(25[0-5]|2[0-4]\d|[01]?\d?\d)){3}$/;


//   const fetchPolicies = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get(
//         "http://localhost:8000/api/firewall-policies"
//       );

//       setPolicies(response.data.results || []);
//     } catch (err) {
//       console.error("Error fetching policies:", err);
//       setError("Error fetching polices");
//     } finally {
//       setLoading(false);
//     }
//   };

  
//   const importAddresses = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get(
//         "http://localhost:8000/api/firewall-addresses"
//       );

//       setAddresses(response.data.results || []);
//     } catch (err) {
//       console.error("Error importing addresses:", err);
//       setError("Error fetching addresses");
//     } finally {
//       setLoading(false);
//     }
//   };


//   const createPolicy = async (e) => {
//     e.preventDefault();


//     if (srcaddr && !ipRegex.test(srcaddr)) {
//       alert("Source address wrong. Формат: x.x.x.x");
//       return;
//     }
//     if (dstaddr && !ipRegex.test(dstaddr)) {
//       alert("Ip type error. Формат: x.x.x.x");
//       return;
//     }


//     const newPolicy = {
//       name,
//       srcintf: srcintf ? [{ name: srcintf }] : [],
//       dstintf: dstintf ? [{ name: dstintf }] : [],
//       srcaddr: srcaddr ? [{ name: srcaddr }] : [],
//       dstaddr: dstaddr ? [{ name: dstaddr }] : [],

//     };

//     try {
//       const response = await axios.post(
//         "http://localhost:8000/api/firewall-policies",
//         newPolicy
//       );
//       alert("Success creating policy");

//       fetchPolicies();

//       setName("");
//       setSrcintf("");
//       setDstintf("");
//       setSrcaddr("");
//       setDstaddr("");
//     } catch (err) {
//       console.error("Бодлого үүсгэхэд алдаа гарлаа:", err);
//       alert("Бодлого үүсгэхэд алдаа гарлаа");
//     }
//   };


//   const deletePolicy = async (policyId) => {
//     if (!window.confirm("Энэ бодлогыг устгахдаа итгэлтэй байна уу?")) {
//       return;
//     }

//     try {
//       await axios.delete(
//         `http://localhost:8000/api/firewall-policies/${policyId}`
//       );
//       alert("Бодлого амжилттай устгагдлаа");

//       fetchPolicies();
//     } catch (err) {
//       console.error("Бодлого устгахад алдаа гарлаа:", err);
//       alert("Бодлого устгахад алдаа гарлаа");
//     }
//   };

//   return (
//     <div className="w-screen p-4">
//       <h1 className="text-2xl font-bold mb-4">
//         FortiGate policy management
//       </h1>

//       <div className="mb-8 p-4 border rounded bg-gray-100">
//         <h2 className="text-xl font-semibold mb-2">Create policy</h2>
//         <form onSubmit={createPolicy} className="flex flex-col gap-4">
//           <div>
//             <label>Name: </label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="border p-1"
//               required
//             />
//           </div>
//           <div>
//             <label>Source interface (srcintf): </label>
//             <input
//               type="text"
//               value={srcintf}
//               onChange={(e) => setSrcintf(e.target.value)}
//               className="border p-1"
//             />
//           </div>
//           <div>
//             <label>Destination address (dstintf): </label>
//             <input
//               type="text"
//               value={dstintf}
//               onChange={(e) => setDstintf(e.target.value)}
//               className="border p-1"
//             />
//           </div>
//           <div>
//             <label>Source address (srcaddr): </label>
//             <input
//               type="text"
//               value={srcaddr}
//               onChange={(e) => setSrcaddr(e.target.value)}
//               className="border p-1"
//               placeholder="192.168.1.1"
//             />
//           </div>
//           <div>
//             <label>Destination address (dstaddr): </label>
//             <input
//               type="text"
//               value={dstaddr}
//               onChange={(e) => setDstaddr(e.target.value)}
//               className="border p-1"
//               placeholder="10.0.0.1"
//             />
//           </div>
//           <button
//             type="submit"
//             className="mt-2 bg-green-500 text-white p-2 rounded"
//           >
//             Бодлого үүсгэх
//           </button>
//         </form>
//       </div>


//       <div className="mb-4 flex gap-4">
//         <button
//           onClick={fetchPolicies}
//           className="bg-blue-500 text-white p-2 rounded"
//         >
//           Fetch policies
//         </button>
//         <button
//           onClick={importAddresses}
//           className="bg-purple-500 text-white p-2 rounded"
//         >
//           Fetch addresses
//         </button>
//       </div>

//       {loading && <p>Loading...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       {/* List of policies */}
//       <div className="mt-4">
//         <h2 className="text-xl font-semibold">Policies</h2>
//         {policies.length > 0
//           ? policies.map((policy, index) => (
//               <div
//                 key={index}
//                 className="flex flex-col border p-2 mb-2 bg-blue-100"
//               >
//                 <div>
//                   <strong>Policy ID:</strong> {policy.policyid || "N/A"}
//                 </div>
//                 <div>
//                   <strong>Name:</strong> {policy.name}
//                 </div>
//                 <div className="flex gap-4 mt-2">
//                   <button
//                     onClick={() => deletePolicy(policy.policyid)}
//                     className="bg-red-500 text-white p-1 rounded"
//                   >
//                     Устгах
//                   </button>
//                 </div>
//               </div>
//             ))
//           : !loading && <p>Policies not found</p>}
//       </div>

//       {/* List of imported addresses */}
//       <div className="mt-8">
//         <h2 className="text-xl font-semibold">Fetched addresses</h2>
//         {addresses.length > 0
//           ? addresses.map((addr, index) => (
//               <div
//                 key={index}
//                 className="flex flex-col border p-2 mb-2 bg-green-100"
//               >
//                 <div>
//                   <strong>Policy ID:</strong> {addr.addrid || "N/A"}
//                 </div>
//                 <div>
//                   <strong>Name:</strong> {addr.name}
//                 </div>
//                 <div>
//                   <strong>Address:</strong> {addr.subnet || addr.ip || "N/A"}
//                 </div>
//               </div>
//             ))
//           : !loading && <p>Address not found</p>}
//       </div>
//     </div>
//   );
// }

// export default App;
"use client";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000/api";

const ipRegex = /^(25[0-5]|2[0-4]\d|[01]?\d?\d)(\.(25[0-5]|2[0-4]\d|[01]?\d?\d)){3}$/;

export default function App() {
  const [policies, setPolicies] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");

  // Form state
  const [name, setName] = useState("");
  const [srcintf, setSrcintf] = useState("");
  const [dstintf, setDstintf] = useState("");
  const [srcaddr, setSrcaddr] = useState("");
  const [dstaddr, setDstaddr] = useState("");

  // UX helpers
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [tab, setTab] = useState("policies"); // "policies" | "addresses" | "create"
  const [query, setQuery] = useState("");

  const filteredPolicies = useMemo(() => {
    if (!query) return policies;
    const q = query.toLowerCase();
    return policies.filter((p) =>
      [p.policyid, p.name, p.action, p.schedule]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [policies, query]);

  const filteredAddresses = useMemo(() => {
    if (!query) return addresses;
    const q = query.toLowerCase();
    return addresses.filter((a) =>
      [a.addrid, a.name, a.subnet, a.type, a.comment]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [addresses, query]);

  const api = axios.create({ baseURL: API_BASE });

  const toast = (msg) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(""), 2500);
  };

  const setErr = (msg) => {
    setError(msg);
    setTimeout(() => setError(null), 3500);
  };

  async function fetchPolicies() {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/firewall-policies");
      setPolicies(res.data?.results || []);
      toast("Policies loaded");
    } catch (e) {
      console.error(e);
      setErr("Failed to fetch policies");
    } finally {
      setLoading(false);
    }
  }

  async function fetchAddresses() {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/firewall-addresses");
      setAddresses(res.data?.results || []);
      toast("Addresses loaded");
    } catch (e) {
      console.error(e);
      setErr("Failed to fetch addresses");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // initial load
    fetchPolicies();
    fetchAddresses();
  }, []);

  async function createPolicy(e) {
    e.preventDefault();

    if (srcaddr && !ipRegex.test(srcaddr)) {
      setErr("Source address must be IPv4 like 192.168.1.1");
      return;
    }
    if (dstaddr && !ipRegex.test(dstaddr)) {
      setErr("Destination address must be IPv4 like 10.0.0.1");
      return;
    }

    const payload = {
      name,
      srcintf: srcintf ? [{ name: srcintf }] : [],
      dstintf: dstintf ? [{ name: dstintf }] : [],
      srcaddr: srcaddr ? [{ name: srcaddr }] : [],
      dstaddr: dstaddr ? [{ name: dstaddr }] : [],
    };

    setLoading(true);
    try {
      await api.post("/firewall-policies", payload);
      toast("Policy created");
      setName("");
      setSrcintf("");
      setDstintf("");
      setSrcaddr("");
      setDstaddr("");
      fetchPolicies();
      setTab("policies");
    } catch (e) {
      console.error(e);
      setErr("Failed to create policy");
    } finally {
      setLoading(false);
    }
  }

  async function deletePolicy(id) {
    setLoading(true);
    try {
      await api.delete(`/firewall-policies/${id}`);
      toast("Policy deleted");
      fetchPolicies();
    } catch (e) {
      console.error(e);
      setErr("Failed to delete policy");
    } finally {
      setLoading(false);
      setConfirmDeleteId(null);
    }
  }

  return (
    <div className="min-h-screen w-full bg-gray-50">
      {/* Top bar */}
      <header className="sticky top-0 z-10 backdrop-blur border-b border-gray-200 bg-white/80">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-bold">FG</div>
            <h1 className="text-xl font-semibold">FortiGate Policy Manager</h1>
          </div>
          <div className="flex gap-2">
            <button onClick={fetchPolicies} className="px-3 py-2 rounded-xl bg-indigo-600 text-white hover:opacity-90">Refresh Policies</button>
            <button onClick={fetchAddresses} className="px-3 py-2 rounded-xl bg-slate-900 text-white hover:opacity-90">Refresh Addresses</button>
          </div>
        </div>
      </header>

      {/* Alerts */}
      <div className="max-w-6xl mx-auto px-4 pt-4">
        {success && (
          <div className="mb-3 rounded-xl bg-green-100 border border-green-300 px-4 py-2 text-green-900">{success}</div>
        )}
        {error && (
          <div className="mb-3 rounded-xl bg-red-100 border border-red-300 px-4 py-2 text-red-900">{error}</div>
        )}
      </div>

      {/* Tabs & Search */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex gap-2">
            {[
              { k: "policies", label: "Policies" },
              { k: "addresses", label: "Addresses" },
              { k: "create", label: "Create Policy" },
            ].map((t) => (
              <button
                key={t.k}
                onClick={() => setTab(t.k)}
                className={`px-4 py-2 rounded-xl border ${
                  tab === t.k ? "bg-white shadow border-gray-300" : "bg-gray-100 border-transparent"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="flex-1" />
          <div className="w-72">
            <input
              className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-white"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        {tab === "create" && (
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Create New Policy</h2>
            <form onSubmit={createPolicy} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-1">
                <label className="block text-sm font-medium mb-1">Name</label>
                <input className="w-full px-3 py-2 rounded-xl border border-gray-300" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Source interface (srcintf)</label>
                <input className="w-full px-3 py-2 rounded-xl border border-gray-300" value={srcintf} onChange={(e) => setSrcintf(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Destination interface (dstintf)</label>
                <input className="w-full px-3 py-2 rounded-xl border border-gray-300" value={dstintf} onChange={(e) => setDstintf(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Source address (IPv4)</label>
                <input className="w-full px-3 py-2 rounded-xl border border-gray-300" value={srcaddr} onChange={(e) => setSrcaddr(e.target.value)} placeholder="192.168.1.1" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Destination address (IPv4)</label>
                <input className="w-full px-3 py-2 rounded-xl border border-gray-300" value={dstaddr} onChange={(e) => setDstaddr(e.target.value)} placeholder="10.0.0.1" />
              </div>
              <div className="md:col-span-2">
                <button disabled={loading} type="submit" className="px-4 py-2 rounded-xl bg-emerald-600 text-white hover:opacity-90 disabled:opacity-50">
                  {loading ? "Creating..." : "Create Policy"}
                </button>
              </div>
            </form>
            {/* <p className="text-xs text-gray-500 mt-3">Note: FortiGate expects <em>object names</em> in srcaddr/dstaddr. If you enter a raw IP, make sure a matching Address object exists, or extend backend to create it automatically.</p> */}
          </div>
        )}

        {tab === "policies" && (
          <div className="rounded-2xl border bg-white p-0 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">ID</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Action</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Schedule</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {loading && (
                    <tr><td colSpan="5" className="px-4 py-4 text-sm text-gray-500">Loading...</td></tr>
                  )}
                  {!loading && filteredPolicies.length === 0 && (
                    <tr><td colSpan="5" className="px-4 py-6 text-sm text-gray-500">No policies found</td></tr>
                  )}
                  {filteredPolicies.map((p) => (
                    <tr key={p.policyid} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm">{p.policyid ?? "—"}</td>
                      <td className="px-4 py-3 text-sm font-medium">{p.name}</td>
                      <td className="px-4 py-3 text-sm">{p.action || "—"}</td>
                      <td className="px-4 py-3 text-sm">{p.schedule || "always"}</td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => setConfirmDeleteId(p.policyid)}
                          className="px-3 py-1.5 rounded-lg bg-red-600 text-white hover:opacity-90"
                        >Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "addresses" && (
          <div className="rounded-2xl border bg-white p-0 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">ID</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Address</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {loading && (
                    <tr><td colSpan="4" className="px-4 py-4 text-sm text-gray-500">Loading...</td></tr>
                  )}
                  {!loading && filteredAddresses.length === 0 && (
                    <tr><td colSpan="4" className="px-4 py-6 text-sm text-gray-500">No addresses found</td></tr>
                  )}
                  {filteredAddresses.map((a) => (
                    <tr key={a.addrid} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm">{a.addrid ?? "—"}</td>
                      <td className="px-4 py-3 text-sm font-medium">{a.name}</td>
                      <td className="px-4 py-3 text-sm">{a.subnet || a.ip || "—"}</td>
                      <td className="px-4 py-3 text-sm">{a.type || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Delete confirm modal */}
      {confirmDeleteId !== null && (
        <div className="fixed inset-0 z-20 bg-black/40 flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold">Delete policy?</h3>
            <p className="text-sm text-gray-600 mt-1">Are you sure you want to delete policy ID {confirmDeleteId}? This cannot be undone.</p>
            <div className="mt-5 flex justify-end gap-2">
              <button onClick={() => setConfirmDeleteId(null)} className="px-4 py-2 rounded-xl border">Cancel</button>
              <button onClick={() => deletePolicy(confirmDeleteId)} className="px-4 py-2 rounded-xl bg-red-600 text-white hover:opacity-90">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Footer
      <footer className="py-8 text-center text-xs text-gray-500">© {new Date().getFullYear()} FortiGate Policy Manager</footer> */}
    </div>
  );
}