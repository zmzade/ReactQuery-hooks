import useAuthStore from "./authStore";
import useAuth from "./useAuth";

const LoginStatus = () => {
  // const { user, dispatch } = useAuth();
  const { user, login, logout } = useAuthStore();

  if (user)
    return (
      <>
        <div>
          <span className="mx-2">{user}</span>
          <a onClick={() => logout()} href="#">
            Logout
          </a>
        </div>
      </>
    );
  return (
    <div>
      <a
        // onClick={() => dispatch({ type: "LOGIN", username: "Zahra" })}
        onClick={() => login("Zahra")}
        href="#"
      >
        Login
      </a>
    </div>
  );
};

export default LoginStatus;
