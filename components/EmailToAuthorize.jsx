"use client";
import React from "react";

const EmailToAuthorize = ({ userEmail, userName }) => {
  const handleEmailClick = () => {
    const email = "rivkyw@hasenfeld-stein.com"; // replace with the admin email
    const subject = "Authorization Request";
    const body = `Hello Admin,
 Please assign authorization to ${userEmail}.

Best regards,
${userName}`;

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const styles = {
    container: {
      textAlign: "center",
      padding: "20px",
      backgroundColor: "#f9f9f9",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    message: {
      fontSize: "16px",
      marginBottom: "20px",
      color: "#333",
    },
    button: {
      backgroundColor: "#0070f3",
      color: "#fff",
      border: "none",
      padding: "10px 20px",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "16px",
    },
    buttonHover: {
      backgroundColor: "#005bb5",
    },
  };

  return (
    <div style={styles.container}>
      <p style={styles.message}>
        Thanks for signing up. Now just email the admin and we will set you up
        in no time.
      </p>
      <button
        style={styles.button}
        onMouseOver={(e) =>
          (e.currentTarget.style.backgroundColor =
            styles.buttonHover.backgroundColor)
        }
        onMouseOut={(e) =>
          (e.currentTarget.style.backgroundColor =
            styles.button.backgroundColor)
        }
        onClick={handleEmailClick}
      >
        Email Admin
      </button>
    </div>
  );
};

export default EmailToAuthorize;
