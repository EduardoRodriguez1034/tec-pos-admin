import { PhotoIcon } from "@heroicons/react/24/solid";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CustomYesNoAlert,
  CustomResponseAlert,
} from "../components/CustomAlert";
import {
  collection,
  db,
  doc,
  getDownloadURL,
  ref,
  setDoc,
  storage,
  uploadBytesResumable,
} from "../firebase";
import md5 from "md5";
import useAuth from "../hooks/useAuth";

const AddUser = () => {
  const navigate = useNavigate();
  const { uid } = useAuth();

  const [image, setImage] = useState(new Blob());
  const [imagePreview, setImagePreview] = useState<string>("");

  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      username: "",
      role: "",
      password: "",
      email: "",
      image: "",
    },
    onSubmit: async (values) => {
      const newUser = doc(collection(db, "users"));
      const storageRef = ref(storage, `users/${values.name}`);
      const imageUrl = await getDownloadURL(storageRef);

      if (imagePreview !== "") {
        await uploadBytesResumable(storageRef, image as Blob);
      }

      CustomYesNoAlert(
        "¿Estás seguro?",
        "Una vez eliminado, no podrás recuperar este usuario",
        "warning"
      ).then((result) => {
        if (result.isDismissed) {
          CustomResponseAlert(
            "¡Cancelado!",
            "El usuario no ha sido guardado",
            "error"
          );
          return;
        }
        setDoc(
          newUser,
          {
            ...values,
            active: true,
            username: (
              formik.values.name.substring(0, 3) +
              formik.values.lastName.substring(0, 3)
            ).toLowerCase(),
            image: imagePreview !== "" ? imageUrl : "",
            restaurantId: uid,
            password: md5(values.password),
          },
          { merge: true }
        ).then(() => {
          CustomResponseAlert(
            "¡Guardado!",
            "El usuario ha sido guardado correctamente",
            "success"
          ).then(() => {
            navigate("/users");
          });
        });
      });
    },
  });

  return (
    <form
      className="p-12"
      onSubmit={formik.handleSubmit}
      onReset={formik.handleReset}
    >
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Informacion del usuario
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Favor de llenar todos los campos para poder registrar al usuario.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nombre
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="given-name"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Apellido
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  autoComplete="family-name"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.lastName}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Contraseña
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="password"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Correo Electronico
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-1">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Usuario
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  disabled
                  value={(
                    formik.values.name.substring(0, 3) +
                    formik.values.lastName.substring(0, 3)
                  ).toLowerCase()}
                  onChange={formik.handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4 ">
              <label
                htmlFor="ingredients"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Roles
              </label>

              <div className="mt-2 flex flex-col md:flex-col">
                {["Administrador", "Ventas", "Finanzas", "Almacen"].map(
                  (role) => (
                    <div className="mt-2">
                      <input
                        id="role"
                        name="role"
                        type="radio"
                        autoComplete="role-name"
                        value={role}
                        onChange={formik.handleChange}
                        className="mr-2"
                        required
                      />
                      <span className="inline-flex rounded-md shadow-sm ">
                        {role}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-full">
          <label
            htmlFor="cover-photo"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Imagen del usuario
          </label>
          <div
            className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
            onDragOver={(e) => {
              e.preventDefault();
            }}
            onDrop={(e) => {
              e.preventDefault();

              setImage(e.dataTransfer.files[0]);
              const fileReader = new FileReader();
              fileReader.onload = () => {
                if (fileReader.readyState === 2) {
                  setImagePreview(fileReader.result as string);
                }
              };
              fileReader.readAsDataURL(e.dataTransfer.files[0]);
            }}
          >
            <div className="text-center">
              {!imagePreview ? (
                <PhotoIcon
                  className="mx-auto h-12 w-12 text-gray-300"
                  aria-hidden="true"
                />
              ) : (
                <img
                  // base64
                  src={`${imagePreview}`}
                  alt="avatar"
                  className="mx-auto h-36 w-36 text-gray-300"
                />
              )}
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label
                  htmlFor="image"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>Subir archivo</span>
                  <input
                    id="image"
                    name="image"
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={(e) => {
                      if (!e.target.files) return;
                      setImage(e.target.files[0]);
                      const fileReader = new FileReader();
                      fileReader.onload = () => {
                        if (fileReader.readyState === 2) {
                          setImagePreview(fileReader.result as string);
                        }
                      };
                      fileReader.readAsDataURL(e.target.files[0]);
                    }}
                  />
                </label>
                <p className="pl-1">o arrastra y suelta</p>
              </div>
              <p className="text-xs leading-5 text-gray-600">
                PNG, JPG, GIF hasta 10MB
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex item s-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
          onClick={() => navigate("/users")}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Guardar
        </button>
      </div>
    </form>
  );
};

export default AddUser;
