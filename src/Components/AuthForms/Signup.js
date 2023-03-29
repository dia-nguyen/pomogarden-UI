import Modal from "../Modal";
import { useState } from "react";
import { DefaultButton } from "../Buttons";

function Signup({ closeModal, signup }) {
  return (
    <Modal title="Signup" closeModal={closeModal}>
      <SignupForm signup={signup} />
    </Modal>
  );
}

function SignupForm({ signup }) {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  }

  async function handleSignup(evt) {
    evt.preventDefault();
    await signup(formData);
  }

  return (
    <form onSubmit={handleSignup}>
      <div className="mb-3">
        <label className="block">email</label>
        <input
          className="appearance-none border rounded py-2 px-3 text-gray-500 w-full"
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="block">name</label>
        <input
          className="appearance-none border rounded py-2 px-3 text-gray-500 w-full"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="block">Password</label>
        <input
          className="appearance-none border rounded py-2 px-3 text-gray-500 w-full"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <DefaultButton
        classes={`bg-purple-400 w-full py-2 px-3 text-white rounded`}
        label="Signup"
      />
    </form>
  );
}

export default Signup;
