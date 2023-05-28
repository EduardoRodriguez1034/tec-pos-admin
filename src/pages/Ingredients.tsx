import { useNavigate } from "react-router-dom";
import useIngredients from "../hooks/useIngredients";

const Ingredients = () => {
  const { ingredients } = useIngredients();
  const navigate = useNavigate();

  const handleDelete = (id: string) => {
    console.log(id);
  };

  return (
    <div className="flex flex-col">
      <button
        onClick={() => navigate("/add/ingredients")}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-8 rounded w-[300px]"
      >
        Agregar Ingrediente
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
                    Cantidad
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Unidad
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Precio Total
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {ingredients.map((ingredient) => (
                  <tr
                    className="border-b dark:border-neutral-500"
                    key={ingredient.id}
                  >
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      {ingredient.name}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {ingredient.stock}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {ingredient.unit}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {ingredient.totalPrice}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                        Editar
                      </button>
                      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
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

export default Ingredients;
