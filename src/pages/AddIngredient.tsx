import { db, collection, doc, setDoc } from "../firebase";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import {
  CustomYesNoAlert,
  CustomResponseAlert,
} from "../components/CustomAlert";

const AddIngredient = () => {
  const restaurantUid = localStorage.getItem("uid");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      totalPrice: "",
      stock: "",
      unit: "Gramos",
    },
    onSubmit: async (values) => {
      const newIngredient = doc(collection(db, "ingredients"));

      CustomYesNoAlert(
        "¿Estás seguro?",
        "Se guardará el ingrediente en la base de datos",

        "warning"
      ).then((result) => {
        if (result.isDismissed) {
          CustomResponseAlert(
            "¡Cancelado!",
            "El ingrediente no ha sido guardado",
            "error"
          );
          return;
        }
        setDoc(
          newIngredient,
          { ...values, restaurantId: restaurantUid },
          { merge: true }
        ).then(() => {
          CustomResponseAlert(
            "¡Guardado!",
            "El ingrediente ha sido guardado correctamente",
            "success"
          ).then(() => {
            navigate("/ingredients");
          });
        });
      });
    },
  });

  return (
    <form className="p-12" onSubmit={formik.handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Informacion del ingrediente
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Favor de llenar todos los campos para poder registrar el
            ingrediente.
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
                  required
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="totalPrice"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Costo Total ($MXN)
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="totalPrice"
                  id="totalPrice"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.totalPrice}
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {formik.errors.totalPrice ? (
                  <div>{formik.errors.totalPrice}</div>
                ) : null}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="stock"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Stock
              </label>
              <div className="mt-2">
                <input
                  id="stock"
                  name="stock"
                  type="number"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.stock}
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="unit"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Unidad de medida
              </label>
              <div className="mt-2">
                <select
                  id="unit"
                  name="unit"
                  autoComplete="unit-name"
                  required
                  onChange={formik.handleChange}
                  defaultValue={formik.values.unit}
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>Miligramos</option>
                  <option>Gramos</option>
                  <option>Kilogramos</option>
                  <option>Mililitros</option>
                  <option>Litros</option>
                  <option>Piezas</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
          onClick={() => navigate("/ingredients")}
        >
          Cancelar
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

export default AddIngredient;
