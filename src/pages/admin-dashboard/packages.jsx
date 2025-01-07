import React, { useState, useEffect, useRef } from "react";
import { Get } from "@/config/api-method";
import Table from "@/component/common/table";
import InputField from "@/component/common/input";
import Toast from "@/component/common/toast";
import { PackagePlus , X } from "lucide-react";
import Button from "@/component/dashboard/button";
import { Post, Put } from "../../config/api-method";

const AllRequestCol = [
  { heading: "Name", key: "name" },
  { heading: "Price", key: "price" },
  { heading: "Detail", key: "detail" },
];

export default function Packages() {
  const [allDatasource, setAllDatasource] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const modalRef = useRef(null);
  const [isUserModal, setUserModal] = useState(false);
  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "",
  });
  const [loading, setLoading] = useState(true);
  const getData = () => {
    Get("/package")
      .then((res) => {
        if (res?.data) {
          setLoading(false);
          setAllDatasource(res?.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  useEffect(() => {
    getData();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    detail: [""]
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDetailChange = (index, value) => {
    const updatedDetails = [...formData.detail];
    updatedDetails[index] = value;
    setFormData({ ...formData, detail: updatedDetails });
  };

  const addDetail = () => {
    setFormData({ ...formData, detail: [...formData.detail, ""] });
  };

  const removeDetail = (index) => {
    const updatedDetails = formData.detail.filter((_, i) => i !== index);
    setFormData({ ...formData, detail: updatedDetails });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const showToast = (message, type) => {
    setToast({ isVisible: true, message, type });

    setTimeout(() => {
      setToast({ ...toast, isVisible: false });
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       await Post("/package", formData);
      setTimeout(() => {
          setUserModal(false)
          getData()
      }, 2000);
      showToast("Plan saved successfully!","success");
    } catch (error) {
      showToast("Failed to save the plan.","error");
    }
  }

  const IDhandle = async (e) => {
    e.preventDefault();
    try {
       await Put("/package", formData);
      setTimeout(() => {
          setUserModal(false)
          getData()
      }, 2000);
      showToast("Plan saved successfully!","success");
    } catch (error) {
      showToast("Failed to save the plan.","error");
    }
  }

  return (
    <section className="px-4">
      <div className="flex gap-4 justify-between py-2">
        <input
          type="text"
          placeholder="Search by name"
          className="w-[280px] h-[40px] bg-white border p-2 rounded-md outline-none"
          onChange={handleSearchChange}
        />
        <div className="flex items-center gap-2">
          <div>
            <button onClick={() => setUserModal(true)}>
              <PackagePlus size={28} color="#dbcce0" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-4 pt-2">
        <Table
          tableClass="overflow-y-scroll max-h-[420px] border w-full"
          tableHeaderClass="bg-fuchsia-700 w-full text-white sticky top-0 capitalize font-montserrat"
          datasource={filterList?.length > 0 ? filterList : allDatasource}
          cols={AllRequestCol}
          loading={loading}
          loaderColor="text-fuchsia-700"
        />
      </div>

     

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />

{isUserModal && (
        <div className="fixed inset-0 w-full z-40 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Add New Package</h2>
            <div >
                
            <Button className="h-8 w-8 rounded-full  bg-[#DD7F62]"  onClick={() => setUserModal(false)}>
              <X className="h-4 w-4 mx-auto text-white" />
            </Button>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name">Name</label>
              <InputField
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter package name"
              />
            </div>
            <div>
              <label htmlFor="price">Price</label>
              <InputField
                id="price"
                name="price"
                type="number"
                
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter package price"
              />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Details</label>
                {formData?.detail?.map((detail, index) => (
                  <div key={index} className="flex items-center space-x-2 mt-2">
                    <input
                      type="text"
                      value={detail}
                      onChange={(e) => handleDetailChange(index, e.target.value)}
                      placeholder={`Detail ${index + 1}`}
                      className="flex-grow px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#DD7F62] focus:border-[#DD7F62]"
                    />
                    <button
                      type="button"
                      onClick={() => removeDetail(index)}
                      disabled={formData.detail.length === 1}
                      className="px-2 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addDetail}
                  className="mt-2 px-4 py-2 bg-[#DD7F62] text-white rounded-md hover:bg-[#DD7F62]/70 transition-colors"
                >
                  Add Detail
                </button>
              </div>
            <Button type="submit" className="w-full text-[#DD7F62]">
              Save Package
            </Button>
          </form>
        </div>
      </div>
      )}
    </section>
  );
}
