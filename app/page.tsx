          <div className="flex items-center gap-3">
            <span className="text-[#D4AF37] text-xs hidden sm:block">ADMINISTRATOR</span>
            <div className="w-10 h-10 rounded-full bg-[#B00020] border border-[#D4AF37] flex items-center justify-center font-bold">HZ</div>
          </div>
        </header>

        <div className="p-5 md:p-8">
          <div className="mb-8">
            <p className="text-[#D4AF37] text-sm tracking-widest">WELCOME TO THE STUDIO</p>
            <h1 className="text-3xl md:text-4xl font-black mt-2">H&Z Studios <span className="text-[#D4AF37]">Dashboard</span></h1>
            <p className="text-gray-400 mt-2">Manage, create and publish your entertainment projects.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Projects", value: publications.length, icon: "▣" },
              { label: "Published", value: published, icon: "✓" },
              { label: "Drafts", value: drafts, icon: "✎" },
              { label: "Studio Divisions", value: divisions.length, icon: "◆" },
            ].map((stat) => (
              <div key={stat.label} className="bg-[#151515] border border-[#302419] rounded-xl p-5 hover:border-[#D4AF37] transition">
                <div className="flex justify-between"><p className="text-gray-400 text-sm">{stat.label}</p><span className="text-[#D4AF37]">{stat.icon}</span></div>
                <h3 className="text-3xl font-black mt-4">{stat.value}</h3>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            <button onClick={() => { if (showForm) resetForm(); else setShowForm(true); }} className="bg-[#B00020] hover:bg-red-800 border border-[#D4AF37] px-5 py-3 rounded-lg font-bold transition">+ Create Publication</button>
            <button onClick={() => setActivePage("Overview")} className="bg-[#202020] border border-gray-700 px-5 py-3 rounded-lg hover:border-[#D4AF37]">View All Projects</button>
          </div>

          {showForm && (
            <div className="bg-[#151515] border border-[#D4AF37] rounded-xl p-6 mb-8">
              <h2 className="text-xl font-bold mb-5">{editingId !== null ? "Edit Publication" : "New Publication"}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm text-gray-400">Publication Title</label>
                  <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter publication title" className="w-full mt-2 p-3 bg-[#080808] border border-gray-700 rounded-lg outline-none focus:border-[#D4AF37]" />
                </div>
                <div>
                  <label className="text-sm text-gray-400">Divisions (choose one or more)</label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {divisions.map((division) => (
                      <label key={division} className="flex items-center gap-2 text-sm text-gray-300 bg-[#080808] border border-gray-700 rounded-lg p-2">
                        <input type="checkbox" checked={types.includes(division)} onChange={() => toggleDivision(division)} />
                        {division}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Genre / Category</label>
                  <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g. Mystery, Fantasy, Sci-Fi" className="w-full mt-2 p-3 bg-[#080808] border border-gray-700 rounded-lg outline-none focus:border-[#D4AF37]" />
                </div>
                <div>
                  <label className="text-sm text-gray-400">Publication Status</label>
                  <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full mt-2 p-3 bg-[#080808] border border-gray-700 rounded-lg">
                    <option>Draft</option><option>Published</option><option>In Progress</option><option>Archived</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={savePublication} className="bg-[#B00020] border border-[#D4AF37] px-6 py-3 rounded-lg font-bold">{editingId !== null ? "Save Changes" : "Save Publication"}</button>
                <button onClick={resetForm} className="bg-[#292929] px-6 py-3 rounded-lg">Cancel</button>
              </div>
            </div>
          )}

          <div className="bg-[#151515] border border-[#302419] rounded-xl overflow-hidden">
            <div className="p-5 border-b border-gray-800 flex justify-between items-center">
              <div><h2 className="font-bold text-lg">Studio Publications</h2><p className="text-gray-500 text-xs mt-1">Manage your entertainment catalogue</p></div>
              <span className="text-[#D4AF37] text-xs">{filteredPublications.length} RECORDS</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[760px]">
                <thead className="bg-[#202020] text-gray-400 text-xs uppercase"><tr><th className="p-4">Title</th><th className="p-4">Division</th><th className="p-4">Category</th><th className="p-4">Status</th><th className="p-4">Actions</th></tr></thead>
                <tbody>
                  {filteredPublications.map((item) => (
                    <tr key={item.id} className="border-t border-gray-800 hover:bg-[#202020]">
                      <td className="p-4 font-bold">{item.title}</td>
                      <td className="p-4 text-gray-400">{item.type.join(", ")}</td>
                      <td className="p-4 text-gray-400">{item.category}</td>
                      <td className="p-4"><span className={`text-xs px-3 py-1 rounded-full ${item.status === "Published" ? "bg-green-900 text-green-300" : "bg-yellow-900 text-yellow-300"}`}>{item.status}</span></td>
                      <td className="p-4"><div className="flex gap-3"><button onClick={() => startEditing(item)} className="text-[#D4AF37] hover:text-yellow-200 text-sm">Edit</button><button onClick={() => deletePublication(item.id)} className="text-red-400 hover:text-red-200 text-sm">Delete</button></div></td>
                    </tr>
                  ))}
                  {filteredPublications.length === 0 && <tr><td colSpan={5} className="p-8 text-center text-gray-500">No publications found in this division.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 bg-[#151515] border border-[#302419] rounded-xl p-6">
            <h2 className="font-bold text-lg mb-4">Studio Administration</h2>
            <p className="text-[#D4AF37] text-sm">Administrator account 1</p>
            <p className="text-gray-300">mlauzizayne@gmail.com</p>
            <p className="text-[#D4AF37] text-sm mt-4">Administrator account 2</p>
            <p className="text-gray-300">Hugh — email needs confirmation</p>
            <p className="text-gray-500 text-xs mt-5">Administrator login and access controls still need to be implemented.</p>
          </div>

          <footer className="text-center text-gray-600 text-xs mt-10 pb-5">© {new Date().getFullYear()} H&Z Studios. All rights reserved. <span className="text-[#D4AF37]">Create. Publish. Inspire.</span></footer>
        </div>
      </section>
    </main>
  );
}
