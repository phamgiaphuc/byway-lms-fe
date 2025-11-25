import React from 'react';
import { useState } from "react";
import SearchBar from './searchbar';
import Background from "C:/Users/Admin/Desktop/lms/byway-lms-fe/src/assets/sign_in_pic.png"

const SignUpPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log({ firstName, lastName, username, email, password, confirmPassword });
  }

  return (
    <div className="min-h-screen w-full bg-white">
      <header>
        <SearchBar />
      </header>
      <hr className="border-t border-gray-300" />

      <div className="flex min-h-screen">

        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="w-full p-6 rounded-lg">

            <h1 className="text-4xl font-bold mb-6 text-center">Create your account</h1>

            <form onSubmit={handleSubmit} className="grid gap-4 justify-center">

              <div className="flex gap-4">
                <div className="grid gap-2 flex-1">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    id="firstName"
                    type="text"
                    className="border p-2 rounded-md w-full"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>

                <div className="grid gap-2 flex-1">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    id="lastName"
                    type="text"
                    className="border p-2 rounded-md w-full"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  type="text"
                  className="border p-2 rounded-md w-[690px]"
                  placeholder="johndoe123"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  className="border p-2 rounded-md w-[690px]"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="flex gap-4">
                <div className="grid gap-2 flex-1">
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    type="password"
                    className="border p-2 rounded-md w-full"
                    placeholder="•••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="grid gap-2 flex-1">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    id="confirmPassword"
                    type="password"
                    className="border p-2 rounded-md w-full"
                    placeholder="•••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-[124px] bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-500 text-sm"
              >
                Sign Up →
              </button>

              <div className="flex items-center my-6 w-[690px]">
                <hr className="flex-grow border-gray-300" />
                <span className="mx-4 text-gray-500 text-sm">Sign up with</span>
                <hr className="flex-grow border-gray-300" />
              </div>
              <button
                type="button"
                className="w-[690px] border border-gray-300 py-2 rounded-md flex items-center justify-center gap-3 hover:bg-gray-100"
                
              >
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                <span className="text-gray-700 text-sm">Google</span>
              </button>

            </form>
          </div>
        </div>

        <div className="w-1/3 flex items-center justify-center">
          <img
            src={Background}
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>

      </div>
    </div>);
}

export default SignUpPage