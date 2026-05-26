import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function UserSelectPage() {
  const [userId, setUserId] = useState("guest");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = userId.trim() || "guest";
    navigate(`/user/${encodeURIComponent(trimmed)}/start`);
  };

  return (
    <section className="page page-start">
      <header className="page-header">
        <h1 className="page-title">Вибір користувача</h1>
        <p className="page-description">
          Введіть або оберіть ідентифікатор користувача, з яким буде повʼязана сесія
          вікторини.
        </p>
      </header>

      <div className="page-content">
        <form className="card" onSubmit={handleSubmit}>
          <h2 className="card-title">Користувач</h2>
          <div className="card-body">
            <div className="form-row">
              <label className="form-label">ID користувача</label>
              <input
                className="input"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="наприклад, student123"
              />
            </div>

            <button className="btn btn-primary" type="submit">
              Перейти до вікторини
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
