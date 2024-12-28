import React, { useEffect } from "react";

declare global {
    interface Window {
        google: any;
    }
}

const GoogleLogin = () => {
    const handleCredentialResponse = (response: any) => {
        console.log("Encoded JWT ID token: " + response.credential);
        // Here, you can decode the token or send it to your backend for validation
    };

    useEffect(() => {
        // Load Google Identity Services script
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        script.onload = () => {
            // Initialize the Google Identity Services API
            window.google.accounts.id.initialize({
                client_id: "YOUR_GOOGLE_CLIENT_ID", // Replace with your Google Client ID
                callback: handleCredentialResponse,
            });

            // Render the Google Sign-In button
            window.google.accounts.id.renderButton(
                document.getElementById("googleSignInDiv"),
                { theme: "outline", size: "large" } // Customize the button as needed
            );
        };

        return () => {
            document.body.removeChild(script); // Clean up the script
        };
    }, []);

    return <div id="googleSignInDiv"></div>;
};

export default GoogleLogin;
