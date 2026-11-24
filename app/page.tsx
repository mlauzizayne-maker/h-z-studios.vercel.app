
"use client";
import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";

type Publication = {
  id: number;
  title: string;
  type: string;
  category: string;
  status: string;
  date: string;
};

const navigation = [
  "Overview",
  "Anime Management",
  "Manga Management",
  "Novel Publishing",
  "Music Management",
  "Broadcasting",
  "Website Pages",
  "Media Library",
  "Administrators",
  "Analytics",
  "Settings"
];


const initialPublications: Publication[] = [
  {
    id: 1,
    title: "Iron Requiem",
    type: "Anime",
    category: "Mecha / Sci-Fi",
    status: "In Progress",
    date: "2026"
  },
  {
    id: 2,
    title: "Crimson Petal",
    type: "Anime",
    category: "Historical / Action",
    status: "Published",
    date: "2025"
  },
  {
    id: 3,
    title: "Static Rain",
    type: "Manga",
    category: "Mystery",
    status: "Published",
    date: "2024"
  },
  {
    id: 4,
    title: "Ruic Chronicles",
    type: "Anime",
    category: "Fantasy",
    status: "Published",
    date: "2026"
  },
  {
    id: 5,
    title: "Ruic Chronicles",
    type: "Manga",
    category: "Fantasy",
    status: "Published",
    date: "2026"
  },
  {
    id: 6,
    title: "Ruic Chronicles",
    type: "Novel",
    category: "Fantasy",
    status: "Published",
    date: "2026"
  }
];



export default function Dashboard() {
useEffect(() => {
  async function checkLogin() {
    const { data } = await supabase.auth.getSession();

    if (!data.session) {
      window.location.href = "/login";
    }
  }

  checkLogin();
}, []);
  const [activePage, setActivePage] = useState("Overview");
  const [publications, setPublications] =
    useState<Publication[]>(initialPublications);

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Anime");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("Draft");

 async function addPublication() {
  if (!title.trim() || !category.trim()) {
    alert("Please enter a title and category.");
    return;
  }

  const { data, error } = await supabase
    .from("publications")
    .insert({
      title,
      type,
      category,
      status,
      release_year: Number(new Date().getFullYear()),
    })
    .select()
    .single();

  if (error) {
    alert("Could not save publication: " + error.message);
    return;
  }

  const newPublication: Publication = {
    id: Number(data.id),
    title: data.title,
    type: data.type,
    category: data.category,
    status: data.status,
    date: String(data.release_year),
  };

  setPublications([newPublication, ...publications]);

  setTitle("");
  setCategory("");
  setStatus("Draft");
  setShowForm(false);
} 

  function deletePublication(id: number) {
    if (confirm("Delete this publication?")) {
      setPublications(publications.filter(item => item.id !== id));
    }
  }

  const published = publications.filter(
    item => item.status === "Published"
  ).length;

  const drafts = publications.filter(
    item => item.status === "Draft"
  ).length;

  const filteredPublications =
    activePage === "Overview"
      ? publications
      : publications.filter(item => {
          const pageType = activePage.replace(
            " Management",
            ""
          ).replace(" Publishing", "");

          return (
            item.type.toLowerCase() === pageType.toLowerCase()
          );
        });

  return (
    <main className="min-h-screen bg-[#080808] text-white flex">

      {/* SIDEBAR */}
      <aside className="w-64 min-h-screen bg-[#111111] border-r border-[#302419] p-5 hidden md:flex flex-col">

        <div className="mb-10">
          <h1 className="text-2xl font-black tracking-wider">
            H<span className="text-[#D4AF37]">&</span>Z
          </h1>
          <p className="text-[#D4AF37] text-xs tracking-[3px]">
            STUDIOS
          </p>
          <p className="text-gray-500 text-xs mt-2">
            ADMIN CONTROL CENTRE
          </p>
        </div>

        <p className="text-gray-500 text-xs mb-3">
          MAIN MENU
        </p>

        <nav className="flex flex-col gap-2">
          {navigation.map((item) => (
            <button
              key={item}
              onClick={() => setActivePage(item)}
              className={`text-left px-3 py-3 rounded-lg text-sm transition ${
                activePage === item
                  ? "bg-[#B00020] text-white border-l-4 border-[#D4AF37]"
                  : "text-gray-400 hover:bg-[#252525] hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="mt-auto border-t border-gray-800 pt-5">
          <p className="text-[#D4AF37] text-xs">
            H&Z STUDIOS
          </p>
          <p className="text-gray-500 text-xs mt-1">
            Management System
          </p>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <section className="flex-1 min-w-0">

        {/* TOP BAR */}
        <header className="h-20 bg-[#111111] border-b border-[#302419] px-5 md:px-8 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold">
              {activePage}
            </h2>
            <p className="text-gray-500 text-xs">
              H&Z Studios Management Portal
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[#D4AF37] text-xs hidden sm:block">
              ADMINISTRATOR
            </span>
            <div className="w-10 h-10 rounded-full bg-[#B00020] border border-[#D4AF37] flex items-center justify-center font-bold">
              HZ
            </div>
          </div>
        </header>

        <div className="p-5 md:p-8">

          {/* WELCOME */}
          <div className="mb-8">
            <p className="text-[#D4AF37] text-sm tracking-widest">
              WELCOME TO THE STUDIO
            </p>
            <h1 className="text-3xl md:text-4xl font-black mt-2">
              H&Z Studios <span className="text-[#D4AF37]">Dashboard</span>
            </h1>
            <p className="text-gray-400 mt-2">
              Manage, create and publish your entertainment projects.
            </p>
          </div>

          {/* STATISTICS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">

            {[
              {
                label: "Total Projects",
                value: publications.length,
                icon: "▣"
              },
              {
                label: "Published",
                value: published,
                icon: "✓"
              },
              {
                label: "Drafts",
                value: drafts,
                icon: "✎"
              },
              {
                label: "Studio Divisions",
                value: 6,
                icon: "◆"
              }
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-[#151515] border border-[#302419] rounded-xl p-5 hover:border-[#D4AF37] transition"
              >
                <div className="flex justify-between">
                  <p className="text-gray-400 text-sm">
                    {stat.label}
                  </p>
                  <span className="text-[#D4AF37]">
                    {stat.icon}
                  </span>
                </div>
                <h3 className="text-3xl font-black mt-4">
                  {stat.value}
                </h3>
              </div>
            ))}

          </div>

          {/* QUICK ACTIONS */}
          <div className="flex flex-wrap gap-3 mb-8">
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-[#B00020] hover:bg-red-800 border border-[#D4AF37] px-5 py-3 rounded-lg font-bold transition"
            >
              + Create Publication
            </button>

            <button
              onClick={() => setActivePage("Overview")}
              className="bg-[#202020] border border-gray-700 px-5 py-3 rounded-lg hover:border-[#D4AF37]"
            >
              View All Projects
            </button>
          </div>

          {/* PUBLISHING FORM */}
          {showForm && (
            <div className="bg-[#151515] border border-[#D4AF37] rounded-xl p-6 mb-8">

              <h2 className="text-xl font-bold mb-5">
                New Publication
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div>
                  <label className="text-sm text-gray-400">
                    Publication Title
                  </label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter publication title"
                    className="w-full mt-2 p-3 bg-[#080808] border border-gray-700 rounded-lg outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-400">
                    Division
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full mt-2 p-3 bg-[#080808] border border-gray-700 rounded-lg"
                  >
                    <option>Anime</option>
                    <option>Manga</option>
                    <option>Novel</option>
                    <option>Music</option>
                    <option>Broadcasting</option>
                    <option>News</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm text-gray-400">
                    Genre / Category
                  </label>
                  <input
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g. Mystery, Fantasy, Sci-Fi"
                    className="w-full mt-2 p-3 bg-[#080808] border border-gray-700 rounded-lg outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-400">
                    Publication Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full mt-2 p-3 bg-[#080808] border border-gray-700 rounded-lg"
                  >
                    <option>Draft</option>
                    <option>Published</option>
                    <option>In Progress</option>
                    <option>Archived</option>
                  </select>
                </div>

              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={addPublication}
                  className="bg-[#B00020] border border-[#D4AF37] px-6 py-3 rounded-lg font-bold"
                >
                  Save Publication
                </button>

                <button
                  onClick={() => setShowForm(false)}
                  className="bg-[#292929] px-6 py-3 rounded-lg"
                >
                  Cancel
                </button>
              </div>

            </div>
          )}

          {/* CONTENT TABLE */}
          <div className="bg-[#151515] border border-[#302419] rounded-xl overflow-hidden">

            <div className="p-5 border-b border-gray-800 flex justify-between items-center">
              <div>
                <h2 className="font-bold text-lg">
                  Studio Publications
                </h2>
                <p className="text-gray-500 text-xs mt-1">
                  Manage your entertainment catalogue
                </p>
              </div>

              <span className="text-[#D4AF37] text-xs">
                {filteredPublications.length} RECORDS
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[650px]">
                <thead className="bg-[#202020] text-gray-400 text-xs uppercase">
                  <tr>
                    <th className="p-4">Title</th>
                    <th className="p-4">Division</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredPublications.map((item) => (
                    <tr
                      key={item.id}
                      className="border-t border-gray-800 hover:bg-[#202020]"
                    >
                      <td className="p-4 font-bold">
                        {item.title}
                      </td>
                      <td className="p-4 text-gray-400">
                        {item.type}
                      </td>
                      <td className="p-4 text-gray-400">
                        {item.category}
                      </td>
                      <td className="p-4">
                        <span className={`text-xs px-3 py-1 rounded-full ${
                          item.status === "Published"
                            ? "bg-green-900 text-green-300"
                            : "bg-yellow-900 text-yellow-300"
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => deletePublication(item.id)}
                          className="text-red-400 hover:text-red-200 text-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}

                  {filteredPublications.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-gray-500">
                        No publications found in this division.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* ADMIN INFORMATION */}
          <div className="mt-8 bg-[#151515] border border-[#302419] rounded-xl p-6">
            <h2 className="font-bold text-lg mb-4">
              Studio Administration
            </h2>

            <div className="space-y-4">
              <div>
                <p className="text-[#D4AF37] text-sm">
                  Administrator account 1
                </p>
                <p className="text-gray-300">
                  mlauzizayne@gmail.com
                </p>
              </div>

              <div>
                <p className="text-[#D4AF37] text-sm">
                  Administrator account 2
                </p>
                <p className="text-gray-300">
                  Hugh — email needs confirmation
                </p>
              </div>
            </div>

            <p className="text-gray-500 text-xs mt-5">
              Additional administrator accounts can be configured later.
            </p>
          </div>

          {/* FOOTER */}
          <footer className="text-center text-gray-600 text-xs mt-10 pb-5">
            © {new Date().getFullYear()} H&Z Studios. All rights reserved.
            <span className="text-[#D4AF37]"> Create. Publish. Inspire.</span>
          </footer>

        </div>
      </section>
    </main>
  );
}
