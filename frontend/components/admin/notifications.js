import { useState, useEffect } from "react";
import axios from "axios";
import { GrAttachment } from 'react-icons/gr'
import { FaTrash } from "react-icons/fa";
import { API_URL } from '@/config/index'
import { toast } from "react-toastify";
export default function Notifications({ token }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [file, setFile] = useState('')
  useEffect(() => {
    fetchNotification();//    
  }, []);
  const fetchNotification = () => {
    axios.get(`${API_URL}/api/notifications?populate=*&sort=createdAt:desc`).then((res) => {
      setNotifications(res.data.data);
    }).catch((err) => {
      console.log(err);
      toast.error("Something went wrong!!")
    });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      toast.info("Enter correctly details");
      return;
    }
    const notificationData = {
      title: title,
      description: description,
    };
    const formData = new FormData();
    formData.append('data', JSON.stringify(notificationData));
    formData.append('files.file', file);
    try {
      const resp = await fetch(`${API_URL}/api/notifications`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData
      });

      if (resp.ok) {
        setTitle('');
        setDescription('');
        setFile(null);
        toast.success("Notification added");
        fetchNotification();
      } else {
        toast.error("Something went wrong!!");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!!");
    }
  };

  const handleUpdateNotification = () => {

  }
  const handleDelete = async (id) => {
    //confirm before deleting
    const yes = window.confirm("Are you sure you want to delete this notification?");
    if (!yes) {
      return;
    }
    await axios.delete(`${API_URL}/api/notifications/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    }).then((res) => {
      setNotifications(notifications.filter((n) => n.id !== id));//or we can fetch again
      toast.success("Deleted successfully ")
    })
      .catch((err) => {
        console.log(err)
        toast.error("Something went wrong!!")
      });
  };

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-md mx-auto">
        <div className="border-2 p-2 rounded shadow">
          <h1 className="text-2xl font-bold mb-4">Add Notification</h1>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
                Title
              </label>
              <input
                className="border rounded-lg py-2 px-3 w-full"
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="description">
                Description
              </label>
              <textarea
                className="border rounded-lg py-2 px-3 w-full"
                id="description"
                value={description}
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="file">
                File
              </label>
              <input
                type="file"
                className="border border-black rounded-lg py-2 px-3 w-full"
                id="file"
                name="file"
                // value={file}
                placeholder="Description"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <button
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-700"
              type="submit" onClick={handleSubmit}
            >
              Add
            </button>
          </form>
        </div>
        <h1 className="text-2xl font-bold my-8">Existing Notifications</h1>
        <div className="mb-4">
          {notifications && notifications.map((notify) => (
            <div key={notify?.id} className="mb-2">
              <div className="flex justify-between items-center border border-gray-400 rounded-lg p-3">
                <div>
                  <h2 className="text-lg font-bold">{notify.attributes.title}</h2>
                  <p className="text-gray-700">{notify.attributes.description}</p>
                  {notify.attributes.file?.data && (<a className='text-yellow-600' href={`${API_URL}${notify?.attributes?.file?.data?.attributes?.url}`} target='_blank'><GrAttachment className='text-lg inline' fill='blue' />Attachment</a>)}
                </div>
                <button
                  onClick={() => handleDelete(notify.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
