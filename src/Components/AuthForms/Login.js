import Modal from "../Modal";
import { useState } from "react";
import { DefaultButton } from "../Buttons";

function Login({ closeModal, login }) {
  return (
    <Modal title="Login" closeModal={closeModal}>
      <LoginForm login={login} />
    </Modal>
  );
}

function LoginForm({ login }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  }

  async function handleLogin(evt){
    evt.preventDefault();
    await login(formData);
  }

  return (
    <form
      onSubmit={handleLogin}
    >
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
        classes={`bg-[#77a158] w-full py-2 px-3 text-white rounded hover:bg-lime-700`}
        label="Login"
      />
    </form>
  );
}

export default Login;
