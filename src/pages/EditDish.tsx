/* eslint-disable @typescript-eslint/no-explicit-any */
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useFormik } from "formik";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import useIngredients from "../hooks/useIngredients";

const EditDish = () => {
  const { state } = useLocation();

  const { ingredients } = useIngredients();
  const navigate = useNavigate();

  const [image, setImage] = useState(new Blob());
  const [imagePreview, setImagePreview] = useState<string>("");

  const formik = useFormik({
    initialValues: {
      name: state.name,
      price: state.price,
      description: state.description,
      ingredientsSelected: {
        ...state.ingredients.reduce(
          (acc: any, ingredient: { id: any }) => ({
            ...acc,
            [ingredient.id]: true,
          }),
          {}
        ),
      } as { [key: string]: boolean },
      ingridientsQuantity: {
        ...state.ingredients.reduce(
          (acc: any, ingredient: { id: any; quantity: any }) => ({
            ...acc,
            [ingredient.id]: ingredient.quantity,
          }),
          {}
        ),
      } as { [key: string]: string },
    },

    onSubmit: async (values) => {
      const selectedIngredients = Object.entries(values.ingredientsSelected)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([_, selected]) => selected)
        .map(([id]) => ({
          id,
          quantity: values.ingridientsQuantity[id] || "",
        }));

      const newDish = doc(db, "dishes", state.id);

      const storageRef = ref(storage, `dishes/${values.name}`);
      await uploadBytesResumable(storageRef, image as Blob);
      const imageUrl = await getDownloadURL(storageRef);

      CustomYesNoAlert(
        "¿Estás seguro?",
        "Se editará el platillo en la base de datos",

        "warning"
      ).then((result) => {
        if (result.isDismissed) {
          CustomResponseAlert(
            "¡Cancelado!",
            "El platillo no ha sido editado",
            "error"
          );
          return;
        }
        setDoc(
          newDish,
          {
            name: values.name,
            description: values.description,
            price: values.price,
            ingredients: selectedIngredients,
            image: imageUrl,
          },
          { merge: true }
        ).then(() => {
          CustomResponseAlert(
            "¡Guardado!",
            "El platillo ha sido editado correctamente",
            "success"
          ).then(() => {
            navigate("/dishes");
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
            Informacion del platillo
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Favor de llenar todos los campos para poder registrar el platillo.
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
                  className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="price"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Precio
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="price"
                  id="price"
                  autoComplete="family-name"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.price}
                  className="block px-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Descripcion
              </label>
              <div className="mt-2">
                <input
                  id="description"
                  name="description"
                  type="description"
                  autoComplete="description"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.description}
                  className="block px-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4 ">
              <label
                htmlFor="ingredients"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Ingredientes
              </label>

              <div className="mt-2 flex flex-col md:flex-row">
                {ingredients.map((ingredient) => (
                  <div
                    className="mr-2 flex flex-row gap-2 mt-2"
                    key={ingredient.id}
                  >
                    <input
                      id="ingredientsSelected"
                      name={`ingredientsSelected.${ingredient.id}`}
                      type="checkbox"
                      autoComplete="ingredientsSelected-name"
                      checked={
                        formik.values.ingredientsSelected[ingredient.id] ||
                        false
                      }
                      onChange={formik.handleChange}
                    />

                    <span className="inline-flex items-center text-center mr-2">
                      {ingredient.name}
                    </span>
                    <input
                      type="number"
                      name={`ingridientsQuantity.${ingredient.id}`}
                      id={`ingridientsQuantity-${ingredient.id}`}
                      autoComplete="ingridientsQuantity"
                      disabled={
                        !formik.values.ingredientsSelected[ingredient.id]
                      }
                      onChange={formik.handleChange}
                      value={
                        formik.values.ingridientsQuantity[ingredient.id] || ""
                      }
                      placeholder="Cantidad"
                      className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-full">
          <label
            htmlFor="cover-photo"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Imagen del platillo
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
                    required
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

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
          onClick={() => navigate("/dishes")}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default EditDish;
