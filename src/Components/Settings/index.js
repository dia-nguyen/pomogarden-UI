import { useState } from "react";
import { DefaultButton } from "../Buttons";
import Modal from "../Modal";

/**
 * Settings Modal
 * Modal for settings
 */
function SettingsModal({ settings, closeModal, saveSettings }) {
  function save(data) {
    saveSettings(data);
    localStorage.setItem("settings", JSON.stringify(data));
    closeModal();
  }

  return (
    <Modal title="Settings" closeModal={closeModal}>
      <SettingsForm settings={settings} save={save} />
    </Modal>
  );
}

function SettingsForm({ settings, save }) {
  const [formData, setFormData] = useState(settings);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  }

  return (
    <form
      onSubmit={(evt) => {
        evt.preventDefault();
        save(formData);
      }}
    >
      <div className="grid grid-cols-3 gap-2 mb-3">
        {Object.keys(settings).map((item, i) => (
          <div key={i}>
            <label className="block">{item}</label>
            <input
              className="appearance-none border rounded py-2 px-3 text-gray-500 w-full"
              type="text"
              name={item}
              value={formData[item]}
              onChange={handleChange}
            />
          </div>
        ))}
      </div>
      <DefaultButton
        classes={`block bg-purple-400 w-full py-2 px-3 text-white rounded`}
        label="Save Settings"
      />
    </form>
  );
}

export default SettingsModal;
