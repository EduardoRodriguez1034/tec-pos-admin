import { useNavigate } from "react-router-dom";
import useDishes from "../hooks/useDishes";
import { db, doc, setDoc } from "../firebase";
import {
  CustomYesNoAlert,
  CustomResponseAlert,
} from "../components/CustomAlert";
import { Dish } from "../models/dishes.model";

const Dishes = () => {
  const { dishes } = useDishes();
  const navigate = useNavigate();

  const handleDelete = async (dbDish: Dish) => {
    const ingredient = doc(db, "dishes", dbDish.id);

    CustomYesNoAlert(
      "¿Estás seguro?",
      "Una vez eliminado, no podrás recuperar este platillo",
      "warning"
    ).then((result) => {
      if (result.isConfirmed) {
        setDoc(
          ingredient,
          {
            ...dbDish,
            deleted: true,
          },
          { merge: true }
        )
          .then(() => {
            CustomResponseAlert(
              "¡Eliminado!",
              "El platillo ha sido eliminado correctamente",
              "success"
            );
          })
          .then(() => {
            navigate("/dishes");
          });
      }
    });
  };
  return (
    <div className="flex flex-col">
      <button
        onClick={() => navigate("/add/dishes")}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-8 rounded w-[300px]"
      >
        Agregar Platillo
      </button>
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr className="border-t-2">
                  <th scope="col" className="px-6 py-4 ">
                    Nombre
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Precio
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Descripcion
                  </th>

                  <th scope="col" className="px-6 py-4">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {dishes.map((dish) => (
                  <tr className="border-b dark:border-neutral-500">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      {dish.name}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      ${dish.price}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {dish.description.substring(0, 20).concat("...")}
                    </td>

                    <td className="whitespace-nowrap px-6 py-4">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                        onClick={() =>
                          navigate("/edit/dishes", { state: dish })
                        }
                      >
                        Editar
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleDelete(dish)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dishes;
