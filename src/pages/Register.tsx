import { useFormik } from "formik";
import {
  auth,
  createUserWithEmailAndPassword,
  db,
  collection,
  doc,
  setDoc,
} from "../firebase";
import { useNavigate } from "react-router-dom";
import { CustomResponseAlert } from "../components/CustomAlert";

const Register = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      fullname: "",
    },
    onSubmit: (values) => {
      if (values.password !== values.confirmPassword) {
        CustomResponseAlert(
          "error",
          "Las contraseñas no coinciden",
          "error"
        ).then(() => {
          formik.resetForm();
        });

        return;
      }
      CustomResponseAlert("success", "Cuenta creada con exito", "success").then(
        () => {
          createUserWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
              localStorage.setItem(
                "email",
                userCredential.user.email as string
              );
              localStorage.setItem(
                "name",
                userCredential.user.displayName as string
              );
              localStorage.setItem("uid", userCredential.user.uid);
              const newUser = doc(collection(db, "restaurants"));
              setDoc(
                newUser,
                {
                  name: values.fullname,
                  email: values.email,
                  uid: userCredential.user.uid,
                },
                { merge: true }
              );

              navigate("/dashboard");
            })
            .catch((error) => {
              CustomResponseAlert("error", error.message, "error");
            });
        }
      );
    },
  });

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <form
        onSubmit={formik.handleSubmit}
        onReset={formik.handleReset}
        className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2"
      >
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Crear cuenta</h1>
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="fullname"
            placeholder="Nombre completo"
            onChange={formik.handleChange}
            value={formik.values.fullname}
          />

          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            placeholder="Correo electronico"
            onChange={formik.handleChange}
            value={formik.values.email}
          />

          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            placeholder="Contraseña"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="confirmPassword"
            placeholder="Confirmar contraseña"
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
          />

          <button
            type="submit"
            className="w-full text-center py-3 rounded bg-blue-600 text-white hover:bg-blue-400 focus:outline-none my-1"
          >
            Crear cuenta
          </button>

          <div className="text-center text-sm text-grey-dark mt-4">
            Al registrarte, aceptas nuestros{" "}
            <a
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="#"
            >
              {" "}
              Terminos y condiciones{" "}
            </a>
            y nuestra{" "}
            <a
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="#"
            >
              Politica de privacidad
            </a>
          </div>
        </div>

        <div className="text-grey-dark mt-6">
          ¿Ya tienes una cuenta?
          <a
            className="no-underline border-b border-blue text-blue"
            href="../login/"
          >
            {" "}
            Inicia sesión
          </a>
          .
        </div>
      </form>
    </div>
  );
};

export default Register;
