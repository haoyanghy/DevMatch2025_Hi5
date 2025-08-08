import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Profile.css";

function ProfilePage({ user, setUser }) {
  const [form, setForm] = useState({
    profileImage: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!user) {
      navigate("/login");
      return;
    }
  }, [user, navigate]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  }

  function handleImageUrlChange(e) {
    setForm({ ...form, profileImage: e.target.value });
    setError("");
    setSuccess("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate password fields if user wants to change password
    if (form.newPassword || form.confirmPassword || form.currentPassword) {
      if (!form.currentPassword) {
        setError("Current password is required to change password.");
        return;
      }
      if (form.newPassword !== form.confirmPassword) {
        setError("New passwords do not match.");
        return;
      }
      if (form.newPassword.length < 6) {
        setError("New password must be at least 6 characters.");
        return;
      }
    }

    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const updateData = {};

      // Only include fields that have values
      if (form.profileImage.trim()) {
        updateData.profile_image = form.profileImage.trim();
      }
      if (form.currentPassword && form.newPassword) {
        updateData.current_password = form.currentPassword;
        updateData.new_password = form.newPassword;
      }

      const response = await axios.put(
        "http://localhost:8000/api/profile", 
        updateData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Update user data in localStorage and state
      const updatedUser = { ...user, profilePicture: response.data.user.profile_image };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);

      setSuccess("Profile updated successfully!");
      
      // Clear password fields after successful update
      setForm({
        ...form,
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });

    } catch (err) {
      setError(
        err.response?.data?.message || 
        "Failed to update profile. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h2>Edit Profile</h2>

        {/* Current Profile Picture */}
        <div className="current-profile-section">
          <h3>Profile Picture</h3>
          <div className="current-avatar">
            <img 
              src={user.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&color=fff&rounded=true&size=100`}
              alt={`${user.name}'s profile`}
              className="avatar-large"
            />
          </div>
        </div>
        
        {/* User Info Display (Non-editable) */}
        <div className="user-info-section">
          <h3>Account Information</h3>
          <div className="info-field">
            <label>Name:</label>
            <span className="info-value">{user.name}</span>
          </div>
          <div className="info-field">
            <label>Email:</label>
            <span className="info-value">{user.email}</span>
          </div>
        </div>

        {/* Editable Form */}
        <form onSubmit={handleSubmit} className="profile-form">
        
          {/* Password Change */}
          <div className="form-section">
            <h3>Change Password</h3>
            <div className="form-field">
              <label htmlFor="currentPassword">Current Password:</label>
              <input
                id="currentPassword"
                name="currentPassword"
                type="password"
                placeholder="Enter your current password"
                value={form.currentPassword}
                onChange={handleChange}
                disabled={submitting}
              />
            </div>
            <div className="form-field">
              <label htmlFor="newPassword">New Password:</label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                placeholder="Enter new password (min 6 characters)"
                value={form.newPassword}
                onChange={handleChange}
                disabled={submitting}
              />
            </div>
            <div className="form-field">
              <label htmlFor="confirmPassword">Confirm New Password:</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your new password"
                value={form.confirmPassword}
                onChange={handleChange}
                disabled={submitting}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" disabled={submitting} className="update-btn">
            {submitting ? "Updating..." : "Update Profile"}
          </button>

          {error && <div className="error-msg">{error}</div>}
          {success && <div className="success-msg">{success}</div>}
        </form>
      </div>
    </div>
  );
}

export default ProfilePage;
