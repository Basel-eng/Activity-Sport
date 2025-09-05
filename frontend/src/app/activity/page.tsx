"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const Activity = () => {
  const [bookings, setactivite] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(false);
  const [formData, setFormData] = useState({
    typeActivity:"",
    username: "",
    time: "",
    history: "",
    email: "",
    usernumber: "",
  });

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/sports/${id}`);
      setactivite((prev) => prev.filter((booking) => booking.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectedBooking) {
      let activityType = "";

      switch (selectedBooking.id) {
        case 1:
          activityType = "كرة قدم";
          break;
        case 2:
          activityType = "كرة تنس";
          break;
        case 3:
          activityType = "كرة سلة";
        case 4:
          activityType = "كرة اليد";
        case 5:
          activityType = "كرة طائرة";
          break;
        default:
          activityType = selectedBooking.typeActivity || "";
      }

      setFormData({
        typeActivity: activityType,
        username: selectedBooking.username,
        time: selectedBooking.time,
        history: selectedBooking.history,
        email: selectedBooking.email,
        usernumber: selectedBooking.usernumber,
      });
    }
  }, [selectedBooking]);


  const handleEdit = async (id, updatedData) => {
    try {
      await axios.put(`http://localhost:8000/api/sports/${id}`, updatedData);

      setactivite((prev) =>
        prev.map((booking) =>
          booking.id === id ? { ...booking, ...updatedData } : booking
        )
      );
    } catch (error) {
      console.log("خطأ في التعديل:", error);
    }
  };
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/sports/getActivity`)
      .then((res) => setactivite(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="relative">
      {/* جدول الحجوزات */}
      <div className="overflow-x-auto rounded border border-red-400 shadow-sm h-screen">
        <table className="min-w-full divide-y-2 divide-red-400">
          <thead className="ltr:text-left rtl:text-right">
            <tr className="*:font-bold *:text-gray-900 text-2xl">
              <th className="px-3 py-2 whitespace-nowrap">id</th>
              <th className="px-3 py-2 whitespace-nowrap">نوع الحجز</th>
              <th className="px-3 py-2 whitespace-nowrap">الاسم</th>
              <th className="px-3 py-2 whitespace-nowrap">تاريخ الحجز</th>
              <th className="px-3 py-2 whitespace-nowrap">توقيت الحجز</th>
              <th className="px-3 py-2 whitespace-nowrap">الايميل</th>
              <th className="px-3 py-2 whitespace-nowrap">رقم الهاتف</th>
              <th className="px-3 py-2 whitespace-nowrap">تعديل - حذف</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-red-400">
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td className="px-5 py-2 whitespace-nowrap">{booking.id}</td>
                <td className="px-3 py-2 whitespace-nowrap">
                  {booking.typeActivity}
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  {booking.username}
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  {booking.history}
                </td>
                <td className="px-3 py-2 whitespace-nowrap">{booking.time}</td>
                <td className="px-3 py-2 whitespace-nowrap">{booking.email}</td>
                <td className="px-3 py-2 whitespace-nowrap">
                  {booking.usernumber}
                </td>
                <td className="px-3 py-2 whitespace-nowrap flex gap-2">
                  <button
                    onClick={() => setSelectedBooking(booking)}
                    className="bg-green-400 p-2 rounded-xl hover:bg-white cursor-pointer transition-all text-xl"
                  >
                    تعديل
                  </button>
                  <button
                    onClick={() => handleDelete(booking.id)}
                    className="bg-red-400 p-2 rounded-xl hover:bg-white cursor-pointer transition-all text-xl"
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[500px] shadow-lg">
            <h2 className="text-2xl font-bold mb-4">تعديل الحجز</h2>
            <form>
              
              <label>UserName:</label>
              <input
                type="text"
                defaultValue={selectedBooking.username}
                className="w-full p-2 border mb-3 rounded"
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
              <label>Time:</label>
              <input
                type="time"
                defaultValue={selectedBooking.time}
                className="w-full p-2 border mb-3 rounded"
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
              />
              <label>history:</label>

              <input
                type="Date"
                defaultValue={selectedBooking.history}
                className="w-full p-2 border mb-3 rounded"
                onChange={(e) =>
                  setFormData({ ...formData, history: e.target.value })
                }
              />
            

              <label>email:</label>

              <input
                type="email"
                defaultValue={selectedBooking.email}
                className="w-full p-2 border mb-3 rounded"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <label>usernumber:</label>

              <input
                type="Number"
                defaultValue={selectedBooking.usernumber}
                className="w-full p-2 border mb-3 rounded"
                onChange={(e) =>
                  setFormData({ ...formData, usernumber: e.target.value })
                }
              />
              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white text-xl cursor-pointer px-4 py-2 rounded"
                  onClick={(e) => {
                    e.preventDefault();
                    handleEdit(selectedBooking.id, formData);
                  }}
                >
                  حفظ التعديلات
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedBooking(null)}
                  className="bg-gray-300 px-4 py-2 cursor-pointer rounded"
                >
                  إغلاق
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Activity;
